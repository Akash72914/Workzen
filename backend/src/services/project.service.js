import prisma from "../config/prisma.js";

export const createProject = async ({ workspaceId, name, description }) => {
    const project = await prisma.project.create({
        data: {
            workspaceId,
            name,
            description,
        },
    });

    return project;
};

export const getWorkspaceProjects = async ({ workspaceId }) => {
    const projects = await prisma.project.findMany({
        where: {
            workspaceId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            workspaceId: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return projects;
};

export const getProjectById = async ({ projectId, workspaceId }) => {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            workspaceId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            workspaceId: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return project;
};
