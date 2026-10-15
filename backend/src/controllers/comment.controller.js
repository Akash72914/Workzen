import {
    createComment,
    deleteComment,
    getTaskComments,
    updateComment,
} from "../services/comment.service.js";

export const createCommentController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;
        const { content } = req.body;
        const userId = req.user.id;

        const comment = await createComment({
            workspaceId,
            projectId,
            taskId,
            userId,
            content,
        });

        return res.status(201).json({ success: true, comment });
    } catch (error) {
        console.error("Create comment error:", error);

        if (error.message === "Project not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Task not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getTaskCommentsController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;

        const comments = await getTaskComments({
            workspaceId,
            projectId,
            taskId,
        });

        return res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error("Task comments error:", error);

        if (error.message === "Project not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Task not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const updateCommentController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;
        const commentId = req.params.commentId;
        const userId = req.user.id;
        const { content } = req.body;

        const updatedComment = await updateComment({
            workspaceId,
            projectId,
            taskId,
            commentId,
            userId,
            content,
        });

        return res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment: updatedComment,
        });
    } catch (error) {
        console.error("Update comment error:", error);

        if (error.message === "Project not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Task not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Comment not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Forbidden") {
            return res
                .status(403)
                .json({ success: false, message: error.message });
        }

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const deleteCommentController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;
        const commentId = req.params.commentId;
        const userId = req.user.id;

        await deleteComment({
            workspaceId,
            projectId,
            taskId,
            commentId,
            userId,
        });

        return res
            .status(200)
            .json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Delete comment error:", error);

        if (error.message === "Project not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Task not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Comment not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Forbidden") {
            return res
                .status(403)
                .json({ success: false, message: error.message });
        }

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
