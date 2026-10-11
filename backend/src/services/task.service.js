import prisma from "../config/prisma.js";

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

    const task = await prisma.task.create({
        data: {
            title,
            description,
            priority,
            dueDate: dueDate ? new Date(dueDate) : null,
            projectId,
            createdById: userId,
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

    return task;
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
