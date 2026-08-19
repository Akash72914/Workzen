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
