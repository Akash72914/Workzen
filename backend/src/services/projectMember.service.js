import prisma from "../config/prisma.js";

export const addProjectMember = async ({
    workspaceId,
    projectId,
    userId,
    role,
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

    const workspaceMember = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId,
            },
        },
        select: {
            id: true,
        },
    });

    if (!workspaceMember) {
        throw new Error("User is not a member of this workspace");
    }

    const existingMember = await prisma.projectMember.findUnique({
        where: {
            userId_projectId: {
                userId,
                projectId,
            },
        },
    });

    if (existingMember) {
        throw new Error("User is already a member of this project");
    }

    const member = await prisma.projectMember.create({
        data: {
            userId,
            projectId,
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

export const getProjectMembers = async ({ projectId, workspaceId }) => {
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

    const members = await prisma.projectMember.findMany({
        where: {
            projectId,
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
