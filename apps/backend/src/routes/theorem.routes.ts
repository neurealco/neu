import { Router } from "express";
import { theoremWebhook } from "../controllers/theorem.controller"; // Importación corregida

const router = Router();

router.post("/webhook", theoremWebhook);

export default router;
