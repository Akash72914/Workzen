export const requireMemberRolePermission = (req, res, next) => {
    const workspaceRole = req.workspaceRole;
    const role = req.body.role;

    if (workspaceRole === "ADMIN" && role === "OWNER") {
        return res.status(403).json({
            success: false,
            message: "Admins cannot assign the OWNER role",
        });
    }

    next();
};
