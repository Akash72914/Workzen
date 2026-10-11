import { createTask } from "../services/task.service.js";

export const createTaskController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const projectId = req.params.projectId;
        const userId = req.user.id;
        const { title, description, priority, assigneeId, dueDate } = req.body;

        const task = await createTask({
            workspaceId,
            projectId,
            userId,
            title,
            description,
            priority,
            assigneeId,
            dueDate,
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: task,
        });
    } catch (error) {
        console.error("Task creation error:", error);

        if (error.message === "Project not found") {
            return res
                .status(404)
                .json({ success: false, message: error.message });
        }

        if (error.message === "Assignee is not a member of this project") {
            return res
                .status(400)
                .json({ success: false, message: error.message });
        }

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
