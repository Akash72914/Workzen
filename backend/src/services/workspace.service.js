import prisma from "../config/prisma.js";

export const createWorkspace = async ({ name, description, ownerId }) => {
    const result = await prisma.$transaction(async (tx) => {
        const workspace = await prisma.workspace.create({
            data: {
                name,
                description,
                ownerId,
            },
        });

        await tx.workspaceMember.create({
            data: {
                userId: ownerId,
                workspaceId: workspace.id,
                role: "OWNER",
            },
        });

        return workspace;
    });

    return result;
};

export const getUserWorkspaces = async (userId) => {
    const workspaces = await prisma.workspaceMember.findMany({
        where: {
            userId,
        },
        select: {
            workspace: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    ownerId: true,
                },
            },

            role: true,
        },
    });

    return workspaces;
};

export const getWorkspaceById = async ({ workspaceId, userId }) => {
    const workspace = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                workspaceId,
                userId,
            },
        },
        select: {
            workspace: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    ownerId: true,
                },
            },

            role: true,
        },
    });

    return workspace;
};

export const updateWorkspace = async ({ workspaceId, name, description }) => {
    const data = {};

    if (name !== undefined) {
        data.name = name;
    }

    if (description !== undefined) {
        data.description = description;
    }

    const workspace = await prisma.workspace.update({
        where: {
            id: workspaceId,
        },
        data,
    });

    return workspace;
};
