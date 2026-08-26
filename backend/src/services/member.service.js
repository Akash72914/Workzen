import prisma from "../config/prisma.js";

export const addWorkspaceMember = async ({ workspaceId, email, role }) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const userId = user.id;

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

    const member = await prisma.workspaceMember.create({
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

    return member;
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
