import prisma from "../config/prisma.js";

export const createComment = async ({
    workspaceId,
    projectId,
    taskId,
    userId,
    content,
}) => {
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

    const comment = await prisma.comment.create({
        data: {
            content,
            taskId,
            userId,
        },
        select: {
            id: true,
            content: true,
            taskId: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return comment;
};

export const getTaskComments = async ({ workspaceId, projectId, taskId }) => {
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

    const comments = await prisma.comment.findMany({
        where: {
            taskId,
        },
        select: {
            id: true,
            content: true,
            taskId: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return comments;
};
