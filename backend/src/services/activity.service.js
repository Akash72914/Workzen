import prisma from "../config/prisma.js";

export const createActivity = async ({
    userId,
    action,
    entityId,
    entityType,
    metadata = undefined,
    db = prisma,
}) => {
    return db.activity.create({
        data: {
            userId,
            action,
            entityId,
            entityType,
            metadata,
        },
    });
};
