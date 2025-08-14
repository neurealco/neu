import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { 
  generateSubscriptionLink,   // Cambio: usamos el nuevo controlador para redirección
  getSubscriptionDetails,
  cancelSubscription,
  handlePaddleWebhook
} from "../controllers/subscription.controller";

const router = Router();

// Ruta pública para webhooks de Paddle
router.post("/webhook", handlePaddleWebhook);

// Rutas protegidas para usuarios autenticados
router.use(authenticate);

// Cambio: Ruta para generar enlace y redirigir (GET)
router.get("/:plan", generateSubscriptionLink);  // Cambiamos a generateSubscriptionLink

router.get("/", getSubscriptionDetails);
router.post("/cancel", cancelSubscription);

export const subscriptionRoutes = router;