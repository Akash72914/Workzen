import prisma from "../config/prisma.js";
import { createActivity } from "./activity.service.js";

export const createTask = async ({
    workspaceId,
    projectId,
    userId,
    title,
    description,
    priority,
    assigneeId,
    dueDate,
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

    if (assigneeId) {
        const assignee = await prisma.projectMember.findFirst({
            where: {
                userId: assigneeId,
                projectId,
            },
            select: {
                id: true,
            },
        });

        if (!assignee) {
            throw new Error("Assignee is not a member of this project");
        }
    }

    return prisma.$transaction(async (tx) => {
        const task = await tx.task.create({
            data: {
                title,
                description,
                priority,
                dueDate: dueDate ? new Date(dueDate) : null,
                projectId,
                // createdById: userId,
                assigneeId: assigneeId || null,
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                dueDate: true,
                projectId: true,
                assigneeId: true,
                createdAt: true,
                updatedAt: true,
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        await createActivity({
            userId,
            action: "CREATED",
            entityId: task.id,
            entityType: "TASK",
            metadata: {
                title: task.title,
            },
            db: tx,
        });

        return task;
    });
};

export const getProjectTasks = async ({ workspaceId, projectId }) => {
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

    const tasks = await prisma.task.findMany({
        where: {
            projectId,
        },
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
            updatedAt: true,
            assignee: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return tasks;
};

export const getTaskById = async ({ workspaceId, projectId, taskId }) => {
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
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
            updatedAt: true,
            assignee: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
};

export const updateTask = async ({
    workspaceId,
    projectId,
    taskId,
    title,
    description,
    status,
    priority,
    assigneeId,
    dueDate,
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

    if (assigneeId !== undefined && assigneeId !== null) {
        const assignee = await prisma.projectMember.findFirst({
            where: {
                userId: assigneeId,
                projectId,
            },
            select: {
                id: true,
            },
        });

        if (!assignee) {
            throw new Error("Assignee is not a member of this project");
        }
    }

    const data = {};

    if (title !== undefined) {
        data.title = title;
    }
    if (description !== undefined) {
        data.description = description;
    }
    if (status !== undefined) {
        data.status = status;
    }
    if (priority !== undefined) {
        data.priority = priority;
    }
    if (assigneeId !== undefined) {
        data.assigneeId = assigneeId;
    }
    if (dueDate !== undefined) {
        data.dueDate = dueDate === null ? null : new Date(dueDate);
    }

    const updatedTask = await prisma.task.update({
        where: {
            id: taskId,
        },
        data,
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            projectId: true,
            assigneeId: true,
            createdAt: true,
            updatedAt: true,
            assignee: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return updatedTask;
};

export const deleteTask = async ({ workspaceId, projectId, taskId }) => {
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

    const deletedTask = await prisma.task.delete({
        where: {
            id: taskId,
        },
    });

    return deletedTask;
};
