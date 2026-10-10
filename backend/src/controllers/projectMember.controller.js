import {
    addProjectMember,
    getProjectMembers,
    updateProjectMemberRole,
} from "../services/projectMember.service.js";

export const addProjectMemberController = async (req, res) => {
    try {
        const { workspaceId, projectId } = req.params;
        const { userId, role } = req.body;

        const member = await addProjectMember({
            workspaceId,
            projectId,
            userId,
            role,
        });

        return res.status(201).json({
            success: true,
            message: "Project member added successfully",
        });
    } catch (error) {
        console.error("Add project member error:", error);

        if (error.message === "Project not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "User is not a member of this workspace") {
            return res
                .status(400)
                .json({ success: false, message: error.message });
        }

        if (error.message === "User is already a member of this project") {
            return res
                .status(409)
                .json({ success: false, message: error.message });
        }

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const projectMembersController = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const workspaceId = req.params.workspaceId;

        const members = await getProjectMembers({ projectId, workspaceId });

        return res.status(200).json({ success: true, members });
    } catch (error) {
        console.log("Project members error:", error);

        if (error.message === "Project not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const updateProjectMemberRoleController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const projectId = req.params.projectId;
        const memberId = req.params.memberId;
        const { role } = req.body;

        const updatedMember = await updateProjectMemberRole({
            workspaceId,
            projectId,
            memberId,
            role,
        });

        return res.status(200).json({
            success: true,
            message: "Project member role updated successfully",
            updatedMember,
        });
    } catch (error) {
        console.log("Update project member role error:", error);

        if (error.message === "Project not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Project member not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
