import { getMyNotifications } from "../services/notification.service.js";

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
