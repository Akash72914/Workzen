import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { notificationsController } from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.get("/", authUser, notificationsController);

export default notificationRouter;
