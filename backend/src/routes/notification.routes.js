import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    getUnreadNotificationCountController,
    markNotificationAsReadController,
    notificationsController,
} from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.get("/", authUser, notificationsController);

notificationRouter.patch(
    "/:notificationId/read",
    authUser,
    markNotificationAsReadController,
);

notificationRouter.get(
    "/unread-count",
    authUser,
    getUnreadNotificationCountController,
);

export default notificationRouter;
