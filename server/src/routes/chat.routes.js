import express from "express";

import {
  getStreamToken,
  syncStreamUser,
} from "../controllers/chat.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/token", getStreamToken);

router.post("/sync-user", syncStreamUser);

export default router;