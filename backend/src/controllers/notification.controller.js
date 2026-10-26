import {
    getMyNotifications,
    markNotificationAsRead,
} from "../services/notification.service.js";

export const notificationsController = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        const userId = req.user.id;

        const result = await getMyNotifications({ userId, page, limit });

        return res.status(200).json({
            success: true,
            notifications: result.notifications,
            pagination: result.pagination,
        });
    } catch (error) {
        console.error("Notifications error:", error);

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const markNotificationAsReadController = async (req, res) => {
    try {
        const userId = req.user.id;
        const notificationId = req.params.notificationId;

        const notification = await markNotificationAsRead({
            userId,
            notificationId,
        });

        if (!notification) {
            return res
                .status(404)
                .json({ success: false, message: "Notification not found" });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Notification marked as read",
                notification,
            });
    } catch (error) {
        console.error("Mark notification as read error:", error);

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
