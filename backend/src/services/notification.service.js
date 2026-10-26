import prisma from "../config/prisma.js";

export const createNotification = async ({
    userId,
    type,
    title,
    message,
    db = prisma,
}) => {
    const notification = await prisma.notification.create({
        data: {
            userId,
            type,
            title,
            message,
        },
        select: {
            id: true,
            userId: true,
            type: true,
            title: true,
            message: true,
            isRead: true,
            createdAt: true,
        },
    });

    return notification;
};

export const getMyNotifications = async ({ userId, page = 1, limit = 20 }) => {
    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(limit) || 20));
    const skip = (pageNumber - 1) * pageSize;

    const [notifications, total] = await prisma.$transaction([
        prisma.notification.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                type: true,
                title: true,
                message: true,
                isRead: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: pageSize,
        }),
        prisma.notification.count({
            where: {
                userId,
            },
        }),
    ]);

    return {
        notifications,
        pagination: {
            page: pageNumber,
            limit: pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        },
    };
};

export const markNotificationAsRead = async ({ userId, notificationId }) => {
    const notification = await prisma.notification.updateMany({
        where: {
            id: notificationId,
            userId,
        },
        data: {
            isRead: true,
        },
    });

    if (notification.count === 0) {
        return null;
    }

    const updatedNotification = await prisma.notification.findFirst({
        where: {
            id: notificationId,
            userId,
        },
        select: {
            id: true,
            type: true,
            title: true,
            message: true,
            isRead: true,
            createdAt: true,
        },
    });

    return updatedNotification;
};
