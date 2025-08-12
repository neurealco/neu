import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { 
  getSubscriptionLink, 
  getSubscriptionDetails,
  cancelSubscription,
  handlePaddleWebhook
} from "../controllers/subscription.controller";

const router = Router();

// Ruta pública para webhooks de Paddle
router.post("/webhook", handlePaddleWebhook);

// Rutas protegidas para usuarios autenticados
router.use(authenticate);

router.get("/:plan", getSubscriptionLink);
router.get("/", getSubscriptionDetails);
router.post("/cancel", cancelSubscription);

export const subscriptionRoutes = router;