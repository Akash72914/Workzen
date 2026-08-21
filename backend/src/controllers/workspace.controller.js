import {
    createWorkspace,
    getUserWorkspaces,
    getWorkspaceById,
    updateWorkspace,
} from "../services/workspace.service.js";

export const workspaceController = async (req, res) => {
    try {
        const { name, description } = req.body;
        const ownerId = req.user.id;

        const workspace = await createWorkspace({
            name,
            description,
            ownerId,
        });

        return res.status(201).json({
            success: true,
            message: "Workspace created successfully",
            workspace,
        });
    } catch (error) {
        console.log("Workspace creation error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getWorkspacesController = async (req, res) => {
    try {
        const userId = req.user.id;

        const workspaces = await getUserWorkspaces(userId);

        return res.status(200).json({ success: true, workspaces });
    } catch (error) {
        console.log("Get workspaces error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getWorkspaceController = async (req, res) => {
    try {
        const userId = req.user.id;
        const workspaceId = req.params.workspaceId;

        const workspace = await getWorkspaceById({
            workspaceId,
            userId,
        });

        if (!workspace) {
            return res
                .status(404)
                .json({ success: false, message: "Workspace not found" });
        }

        return res.status(200).json({ success: true, workspace });
    } catch (error) {
        console.log("Get workspace error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const updateWorkspaceController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const { name, description } = req.body;

        const updatedWorkspace = await updateWorkspace({
            workspaceId,
            name,
            description,
        });

        return res.status(200).json({
            success: true,
            message: "Workspace updated successfully",
            updatedWorkspace,
        });
    } catch (error) {
        console.error("Workspace not updated:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
