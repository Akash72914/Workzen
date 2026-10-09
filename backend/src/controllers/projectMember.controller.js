import { addProjectMember } from "../services/projectMember.service.js";

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
