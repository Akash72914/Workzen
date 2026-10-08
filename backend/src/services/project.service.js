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

export const updateProject = async ({
    projectId,
    workspaceId,
    name,
    description,
    status,
}) => {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            workspaceId,
        },
    });

    if (!project) {
        return null;
    }

    const data = {};

    if (name !== undefined) {
        data.name = name;
    }

    if (description !== undefined) {
        data.description = description;
    }

    if (status !== undefined) {
        data.status = status;
    }

    const updatedProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data,
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

    return updatedProject;
};

export const deleteProject = async ({ projectId, workspaceId }) => {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            workspaceId,
        },
    });

    if (!project) {
        return null;
    }

    const deletedProject = await prisma.project.delete({
        where: {
            id: projectId,
        },
    });

    return deletedProject;
};
