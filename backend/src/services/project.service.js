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
