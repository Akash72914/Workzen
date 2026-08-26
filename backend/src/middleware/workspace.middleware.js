import prisma from "../config/prisma.js";

export const requireWorkspaceRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const workspaceId = req.params.workspaceId;

            const membership = await prisma.workspaceMember.findUnique({
                where: {
                    userId_workspaceId: {
                        userId,
                        workspaceId,
                    },
                },
                select: {
                    role: true,
                },
            });

            if (!membership) {
                return res.status(403).json({
                    success: false,
                    message: "You do not have access to this workspace",
                });
            }

            if (!allowedRoles.includes(membership.role)) {
                return res.status(403).json({
                    success: false,
                    message:
                        "You do not have permission to perform this action",
                });
            }

            req.workspaceRole = membership.role;

            next();
        } catch (error) {
            console.error("Workspace authorization error:", error);

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    };
};

export const requireWorkspaceMember = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const workspaceId = req.params.workspaceId;

        const membership = await prisma.workspaceMember.findUnique({
            where: {
                userId_workspaceId: {
                    userId,
                    workspaceId,
                },
            },
        });

        if (!membership) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "You do not have access to this workspace",
                });
        }

        next();
    } catch (error) {
        console.error("Workspace membership error:", error);

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
