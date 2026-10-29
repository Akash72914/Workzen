import prisma from "../config/prisma.js";
import { createActivity } from "./activity.service.js";
import { createNotification } from "./notification.service.js";

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
    userId,
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
            title: true,
            description: true,
            status: true,
            priority: true,
            assigneeId: true,
            dueDate: true,
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

    return prisma.$transaction(async (tx) => {
        const updatedTask = await tx.task.update({
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

        const activities = [];

        if (task.status !== updatedTask.status) {
            activities.push({
                action: "STATUS_CHANGED",
                metadata: {
                    oldValue: task.status,
                    newValue: updatedTask.status,
                },
            });
        }

        if (task.title !== updatedTask.title) {
            activities.push({
                action: "UPDATED",
                metadata: {
                    field: "title",
                    oldValue: task.title,
                    newValue: updatedTask.title,
                },
            });
        }

        if (task.description !== updatedTask.description) {
            activities.push({
                action: "UPDATED",
                metadata: {
                    field: "description",
                    oldValue: task.description,
                    newValue: updatedTask.description,
                },
            });
        }

        if (task.priority !== updatedTask.priority) {
            activities.push({
                action: "UPDATED",
                metadata: {
                    field: "priority",
                    oldValue: task.priority,
                    newValue: updatedTask.priority,
                },
            });
        }

        const oldDueDate = task.dueDate?.getTime() ?? null;
        const newDueDate = updatedTask.dueDate?.getTime() ?? null;

        if (oldDueDate !== newDueDate) {
            activities.push({
                action: "UPDATED",
                metadata: {
                    field: "dueDate",
                    oldValue: task.dueDate?.toISOString() ?? null,
                    newValue: updatedTask.dueDate?.toISOString() ?? null,
                },
            });
        }

        if (task.assigneeId !== updatedTask.assigneeId) {
            activities.push({
                action: updatedTask.assigneeId ? "ASSIGNED" : "UNASSIGNED",
                metadata: {
                    oldAssigneeId: task.assigneeId,
                    newAssigneeId: updatedTask.assigneeId,
                },
            });
        }

        for (const activity of activities) {
            await createActivity({
                userId,
                action: activity.action,
                entityId: taskId,
                entityType: "TASK",
                metadata: activity.metadata,
                db: tx,
            });
        }

        if (
            task.assigneeId !== updatedTask.assigneeId &&
            updatedTask.assigneeId !== null &&
            updatedTask.assigneeId !== userId
        ) {
            await createNotification({
                userId: updatedTask.assigneeId,
                type: "TASK_ASSIGNED",
                title: "Task Assigned",
                message: `You have been assigned to the "${updatedTask.title}".`,
                db: tx,
            });
        }

        if (
            task.status !== updatedTask.status &&
            updatedTask.assigneeId !== null &&
            updatedTask.assigneeId !== userId
        ) {
            await createNotification({
                userId: updatedTask.assigneeId,
                type: "TASK_STATUS_CHANGED",
                title: "Task Status Updated",
                message: `The status of task changed from "${task.status}" to "${updatedTask.status}"`,
                db: tx,
            });
        }

        return updatedTask;
    });
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
