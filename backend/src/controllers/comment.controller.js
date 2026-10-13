import { createComment, getTaskComments } from "../services/comment.service.js";

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
