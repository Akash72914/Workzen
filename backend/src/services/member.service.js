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
