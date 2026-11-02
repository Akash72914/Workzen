import prisma from "../config/prisma.js";
import { createActivity } from "./activity.service.js";
import { createNotification } from "./notification.service.js";

export const addWorkspaceMember = async ({ workspaceId, email, role }) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const userId = user.id;

    const workspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId,
        },
        select: {
            id: true,
            name: true,
        },
    });

    if (!workspace) {
        throw new Error("Workspace not found");
    }

    const existingMember = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId,
            },
        },
    });

    if (existingMember) {
        throw new Error("User is already a member");
    }

    return prisma.$transaction(async (tx) => {
        const member = await tx.workspaceMember.create({
            data: {
                userId,
                workspaceId,
                role,
            },
            select: {
                id: true,
                role: true,
                createdAt: true,
                user: {
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
            action: "MEMBER_ADDED",
            entityId: workspaceId,
            entityType: "WORKSPACE",
            metadata: {
                memberId: userId,
                memberName: user.name,
                memberEmail: user.email,
                role,
            },
            db: tx,
        });

        await createNotification({
            userId,
            type: "MEMBER_ADDED",
            title: "Added to Workspace",
            message: `You have been added to the workspace "${workspace.name}".`,
            db: tx,
        });

        return member;
    });
};

export const getWorkspaceMembers = async ({ workspaceId }) => {
    const members = await prisma.workspaceMember.findMany({
        where: {
            workspaceId,
        },
        select: {
            id: true,
            role: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return members;
};

export const updateMemberRole = async ({ workspaceId, memberId, role }) => {
    const workspaceMember = await prisma.workspaceMember.findUnique({
        where: {
            id: memberId,
        },
        select: {
            id: true,
            role: true,
            userId: true,
            workspaceId: true,
            workspace: {
                select: { ownerId: true },
            },
            user: {
                select: { id: true, name: true, email: true },
            },
        },
    });

    if (!workspaceMember) {
        throw new Error("Workspace member not found");
    }

    if (workspaceMember.workspaceId !== workspaceId) {
        throw new Error("Workspace member does not belong to this workspace");
    }

    if (workspaceMember.userId === workspaceMember.workspace.ownerId) {
        throw new Error("Cannot change the workspace owner's role");
    }

    const updatedMember = await prisma.workspaceMember.update({
        where: {
            id: memberId,
        },
        data: {
            role,
        },
        select: {
            id: true,
            role: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return updatedMember;
};

export const removeWorkspaceMember = async ({ workspaceId, memberId }) => {
    const workspaceMember = await prisma.workspaceMember.findUnique({
        where: {
            id: memberId,
        },
        select: {
            workspaceId: true,
            userId: true,
            workspace: {
                select: { ownerId: true },
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    if (!workspaceMember) {
        throw new Error("Workspace member not found");
    }

    if (workspaceMember.workspaceId !== workspaceId) {
        throw new Error("Workspace member does not belong to this workspace");
    }

    if (workspaceMember.userId === workspaceMember.workspace.ownerId) {
        throw new Error("Cannot remove the workspace owner");
    }

    const removedMember = await prisma.workspaceMember.delete({
        where: {
            id: memberId,
        },
        select: {
            id: true,
            role: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return removedMember;
};

export const leaveWorkspace = async ({ workspaceId, userId }) => {
    const workspaceMember = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId,
            },
        },
        select: {
            id: true,
            role: true,
            workspace: {
                select: {
                    ownerId: true,
                },
            },
        },
    });

    if (!workspaceMember) {
        throw new Error("You are not a member of this workspace");
    }

    if (userId === workspaceMember.workspace.ownerId) {
        throw new Error("Workspace owner cannot leave the workspace");
    }

    const leftWorkspace = await prisma.workspaceMember.delete({
        where: {
            id: workspaceMember.id,
        },
        select: {
            id: true,
            role: true,
            createdAt: true,
        },
    });

    return leftWorkspace;
};
