import prisma from "../config/prisma.js";
import { createActivity } from "./activity.service.js";
import { createNotification } from "./notification.service.js";

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
            name: true,
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

    return prisma.$transaction(async (tx) => {
        const member = await tx.projectMember.create({
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

        await createActivity({
            userId,
            action: "MEMBER_ADDED",
            entityId: projectId,
            entityType: "PROJECT",
            metadata: {
                memberId: userId,
                role,
            },
            db: tx,
        });

        await createNotification({
            userId,
            type: "MEMBER_ADDED",
            title: "Added to Project",
            message: `You have been added to the project "${project.name}".`,
            db: tx,
        });

        return member;
    });
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

export const updateProjectMemberRole = async ({
    workspaceId,
    projectId,
    memberId,
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

    const member = await prisma.projectMember.findFirst({
        where: {
            id: memberId,
            projectId,
        },
        select: {
            id: true,
        },
    });

    if (!member) {
        throw new Error("Project member not found");
    }

    const updatedMember = await prisma.projectMember.update({
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

export const removeProjectMember = async ({
    workspaceId,
    projectId,
    memberId,
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

    const member = await prisma.projectMember.findFirst({
        where: {
            id: memberId,
            projectId,
        },
        select: {
            id: true,
        },
    });

    if (!member) {
        throw new Error("Project member not found");
    }

    const deletedMember = await prisma.projectMember.delete({
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

    return deletedMember;
};
