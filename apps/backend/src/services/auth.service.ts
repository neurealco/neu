import { supabase } from "./supabase.service";
import jwt from "jsonwebtoken";
import config from "../config";
import bcrypt from "bcrypt";
import { transporter, passwordResetTemplate } from "./email.service"; // Corrección
import { redisClient } from "../utils/cache.util";
import logger from "../utils/logger.util";
import crypto from "crypto";

const SALT_ROUNDS = 10;
const RESET_TOKEN_EXPIRY = 60 * 60; // 1 hora en segundos

// Validación de fortaleza de contraseña
const validatePassword = (password: string) => {
  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("La contraseña debe contener al menos una letra mayúscula");
  }
  if (!/[0-9]/.test(password)) {
    throw new Error("La contraseña debe contener al menos un número");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    throw new Error("La contraseña debe contener al menos un carácter especial");
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    validatePassword(password);
    
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          password_hash: hashedPassword,
          signup_method: "email_password"
        }
      }
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("User creation failed");

    // Crear perfil básico
    await supabase
      .from("profiles")
      .upsert({
        id: data.user.id,
        email,
        subscription_plan: "free",
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 días de prueba
      });

    return data.user;
  } catch (error: any) {
    logger.error(`Signup failed: ${error.message}`);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    // Verificar si el usuario existe
    const { data: userData, error: findError } = await supabase
      .from("profiles")
      .select("id, password_hash")
      .eq("email", email)
      .single();

    if (findError || !userData) {
      // Respuesta genérica para evitar ataques de tiempo
      await bcrypt.compare(password, "$2b$10$fakehashforsecurity");
      throw new Error("Credenciales inválidas");
    }

    // Obtener hash almacenado
    const storedHash = userData.password_hash;
    
    // Comparación segura
    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) {
      throw new Error("Credenciales inválidas");
    }

    // Autenticar con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw new Error(error.message);
    return data.user;
  } catch (error: any) {
    logger.error(`Login failed: ${error.message}`);
    throw error;
  }
};

export const initiatePasswordReset = async (email: string) => {
  try {
    // Verificar si el usuario existe
    const { data: user, error } = await supabase
      .from("profiles")
      .select("id, email")
      .eq("email", email)
      .single();

    if (error || !user) {
      logger.info(`Password reset requested for non-existent email: ${email}`);
      return; // No revelar si el email existe
    }

    // Generar token único
    const token = crypto.randomBytes(32).toString("hex");
    const cacheKey = `reset_token:${token}`;

    // Almacenar en Redis con expiración
    await redisClient.setex(
      cacheKey, 
      RESET_TOKEN_EXPIRY, 
      JSON.stringify({
        user_id: user.id,
        email: user.email,
        timestamp: Date.now()
      })
    );

    // Enviar email usando SMTP propio
    await transporter.sendMail({
      from: `"Soporte Neureal" <soporte@${new URL(config.SITE_URL).hostname}>`,
      to: email,
      subject: "Restablece tu contraseña de Neureal",
      html: passwordResetTemplate(token)
    });

    logger.info(`Password reset token sent to: ${email}`);
  } catch (error: any) {
    logger.error(`Password reset initiation failed: ${error.message}`);
    throw new Error("Error al procesar la solicitud");
  }
};

export const validateResetToken = async (token: string) => {
  try {
    const cacheKey = `reset_token:${token}`;
    const tokenData = await redisClient.get(cacheKey);
    
    if (!tokenData) {
      throw new Error("Token inválido o expirado");
    }

    const { user_id, email } = JSON.parse(tokenData);
    return { userId: user_id, email };
  } catch (error: any) {
    logger.error(`Token validation failed: ${error.message}`);
    throw new Error("Token inválido");
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    validatePassword(newPassword);
    
    const { userId } = await validateResetToken(token);
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Actualizar contraseña en Supabase Auth
    const { error: authError } = await supabase.auth.admin.updateUserById(
      userId,
      { password: newPassword }
    );

    if (authError) throw new Error(authError.message);

    // Actualizar hash en la base de datos
    await supabase
      .from("profiles")
      .update({ password_hash: hashedPassword })
      .eq("id", userId);

    // Eliminar token usado
    await redisClient.del(`reset_token:${token}`);

    logger.info(`Password reset for user: ${userId}`);
    return true;
  } catch (error: any) {
    logger.error(`Password reset failed: ${error.message}`);
    throw error;
  }
};

export const changePassword = async (
  userId: string, 
  currentPassword: string, 
  newPassword: string
) => {
  try {
    validatePassword(newPassword);
    
    // Obtener hash actual
    const { data: user, error } = await supabase
      .from("profiles")
      .select("password_hash")
      .eq("id", userId)
      .single();

    if (error || !user) throw new Error("Usuario no encontrado");

    // Verificar contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) throw new Error("Contraseña actual incorrecta");

    // Actualizar contraseña
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    
    await supabase.auth.admin.updateUserById(userId, {
      password: newPassword
    });

    await supabase
      .from("profiles")
      .update({ password_hash: hashedPassword })
      .eq("id", userId);

    return true;
  } catch (error: any) {
    logger.error(`Password change failed: ${error.message}`);
    throw error;
  }
};

// Función existente para manejo de callback de Google
export const handleCallback = async (code: string) => {
  try {
    // ... (implementación existente de Google OAuth callback)
    return {} as any; // Placeholder
  } catch (error: any) {
    throw error;
  }
};