import prisma from "../config/prisma.js";

export const createActivity = async ({
    userId,
    action,
    entityId,
    entityType,
    metadata,
}) => {
    const activity = await prisma.activity.create({
        data: {
            userId,
            action,
            entityId,
            entityType,
            metadata,
        },
    });

    return activity;
};
