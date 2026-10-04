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

export const deleteWorkspace = async (workspaceId) => {
    const workspace = await prisma.workspace.delete({
        where: {
            id: workspaceId,
        },
    });

    return workspace;
};

export const transferWorkspaceOwnership = async ({
    workspaceId,
    currentOwnerId,
    newOwnerId,
}) => {
    const currentOwner = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: currentOwnerId,
                workspaceId,
            },
        },
        select: {
            id: true,
            role: true,
            userId: true,
        },
    });

    const newOwner = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: newOwnerId,
                workspaceId,
            },
        },
        select: {
            id: true,
            role: true,
            userId: true,
        },
    });

    if (!currentOwner) {
        throw new Error("You are not a member of this workspace");
    }

    if (currentOwner.role !== "OWNER") {
        throw new Error("You are not the workspace owner");
    }

    if (currentOwnerId === newOwnerId) {
        throw new Error("You are already the workspace owner");
    }

    if (!newOwner) {
        throw new Error("Target user is not a member of this workspace");
    }

    if (newOwner.role === "OWNER") {
        throw new Error("User is already the workspace owner");
    }

    const result = await prisma.$transaction(async (tx) => {
        await tx.workspace.update({
            where: {
                id: workspaceId,
            },
            data: {
                ownerId: newOwnerId,
            },
        });

        await tx.workspaceMember.update({
            where: {
                id: currentOwner.id,
            },
            data: {
                role: "MEMBER",
            },
        });

        const updatedOwner = await tx.workspaceMember.update({
            where: {
                id: newOwner.id,
            },
            data: {
                role: "OWNER",
            },
            select: {
                id: true,
                role: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return updatedOwner;
    });

    return result;
};
