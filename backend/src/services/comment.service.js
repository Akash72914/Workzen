import prisma from "../config/prisma.js";
import { createActivity } from "./activity.service.js";
import { createNotification } from "./notification.service.js";

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
            title: true,
            assigneeId: true,
        },
    });

    if (!task) {
        throw new Error("Task not found");
    }

    return prisma.$transaction(async (tx) => {
        const comment = await tx.comment.create({
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

        await createActivity({
            userId,
            action: "COMMENTED",
            entityId: taskId,
            entityType: "TASK",
            metadata: {
                commentId: comment.id,
            },
            db: tx,
        });

        if (task.assigneeId && task.assigneeId !== userId) {
            await createNotification({
                userId: task.assigneeId,
                type: "COMMENT_ADDED",
                title: "New Comment",
                message: `A new comment was added to the task "${task.title}".`,
                db: tx,
            });
        }

        return comment;
    });
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

export const updateComment = async ({
    workspaceId,
    projectId,
    taskId,
    commentId,
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

    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId,
            taskId,
        },
        select: {
            id: true,
            userId: true,
        },
    });

    if (!comment) {
        throw new Error("Comment not found");
    }

    if (comment.userId !== userId) {
        throw new Error("Forbidden");
    }

    const data = {};

    if (content !== undefined) {
        data.content = content;
    }

    const updatedComment = await prisma.comment.update({
        where: {
            id: commentId,
        },
        data,
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

    return updatedComment;
};

export const deleteComment = async ({
    workspaceId,
    projectId,
    taskId,
    commentId,
    userId,
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

    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId,
            taskId,
        },
        select: {
            id: true,
            userId: true,
        },
    });

    if (!comment) {
        throw new Error("Comment not found");
    }

    if (comment.userId !== userId) {
        throw new Error("Forbidden");
    }

    const deletedComment = await prisma.comment.delete({
        where: {
            id: commentId,
        },
    });

    return deletedComment;
};
