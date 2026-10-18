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

export const getTaskActivities = async ({ workspaceId, projectId, taskId }) => {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            workspaceId,
        },
        select: {
            id: true,
        },
    });

    if (!project) {
        throw new Error("Project not found");
    }

    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            projectId,
        },
        select: {
            id: true,
        },
    });

    if (!task) {
        throw new Error("Task not found");
    }

    const activities = await prisma.activity.findMany({
        where: {
            entityId: taskId,
            entityType: "TASK",
        },
        select: {
            id: true,
            userId: true,
            action: true,
            entityId: true,
            entityType: true,
            metadata: true,
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return activities;
};
