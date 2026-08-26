import {
    addWorkspaceMember,
    getWorkspaceMembers,
    updateMemberRole,
} from "../services/member.service.js";

export const addMemberController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const { email, role } = req.body;

        const member = await addWorkspaceMember({
            workspaceId,
            email,
            role,
        });

        return res.status(201).json({
            success: true,
            message: "Member added successfully",
            member,
        });
    } catch (error) {
        console.error("Member added error", error);

        if (error.message === "User not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "User is already a member") {
            return res
                .status(409)
                .json({ success: false, message: error.message });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getMembersController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;

        const members = await getWorkspaceMembers({
            workspaceId,
        });

        return res.status(200).json({ success: true, members });
    } catch (error) {
        console.error("Get workspace members error", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const updateMemberRoleController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const memberId = req.params.memberId;
        const { role } = req.body;

        const member = await updateMemberRole({ workspaceId, memberId, role });

        return res.status(200).json({
            success: true,
            message: "Workspace member role updated successfully",
            member,
        });
    } catch (error) {
        console.log("Member role update error:", error);

        if (error.message === "Workspace member not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (
            error.message ===
            "Workspace member does not belong to this workspace"
        ) {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Cannot change the workspace owner's role") {
            return res
                .status(403)
                .json({ success: false, message: error.message });
        }

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
