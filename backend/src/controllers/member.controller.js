import { addWorkspaceMember } from "../services/member.service.js";

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
