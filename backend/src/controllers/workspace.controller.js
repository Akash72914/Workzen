import {
    createWorkspace,
    deleteWorkspace,
    getUserWorkspaces,
    getWorkspaceById,
    transferWorkspaceOwnership,
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

export const deleteWorkspaceController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;

        await deleteWorkspace(workspaceId);

        return res
            .status(200)
            .json({ success: true, message: "Workspace deleted" });
    } catch (error) {
        console.error("Workspace not deleted:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const ownershipTransferController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const currentOwnerId = req.user.id;
        const newOwnerId = req.body.userId;

        const ownership = await transferWorkspaceOwnership({
            workspaceId,
            currentOwnerId,
            newOwnerId,
        });

        return res.status(200).json({
            success: true,
            message: "Workspace ownership transferred successfully",
            ownership,
        });
    } catch (error) {
        console.log("Ownership transfer error:", error);

        if (error.message === "You are not a member of this workspace") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "You are not the workspace owner") {
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "You are already the workspace owner") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Target user is not a member of this workspace") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "User is already the workspace owner") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
