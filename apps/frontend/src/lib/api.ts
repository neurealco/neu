import { API_BASE_URL } from './apiConfig';

export const getUserCredits = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/credits/balance?userId=${userId}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch credits');
    }
    
    const data = await response.json();
    return data.credits;
  } catch (error) {
    console.error('Error fetching credits:', error);
    throw error;
  }
};

export const getSurveyUrl = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/theorem/survey-url?userId=${userId}`, {
    credentials: 'include'
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to get survey URL');
  }
  
  return response.text();
};

export const fetchDashboardData = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/dashboard?userId=${userId}`, {
    credentials: 'include',
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch dashboard data');
  }
  
  return response.json();
};

export const getSession = async (request: Request) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/session`, {
      headers: {
        'Cookie': request.headers.get('Cookie') || ''
      },
      credentials: 'include'
    });
    
    if (!response.ok) return null;
    
    const sessionData = await response.json();
    return sessionData.user || null;
  } catch (error) {
    console.error('Session check failed:', error);
    return null;
  }
};

export const refreshStats = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard/refresh`, {
    method: 'POST',
    credentials: 'include'
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to refresh stats');
  }
  
  return response.json();
};

// Función para enviar mensajes al asistente IA
export const sendAIMessage = async (userId: string, message: string) => {
  const response = await fetch(`${API_BASE_URL}/ai/chat`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, message })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'AI service failed');
  }
  
  return response.text();
};

// Función para obtener historial de transacciones
export const getTransactionHistory = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/credits/history?userId=${userId}`, {
    credentials: 'include'
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch transaction history');
  }
  
  return response.json();
};