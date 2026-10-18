import { getTaskActivities } from "../services/activity.service.js";

export const getTaskActivitiesController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;

        const activities = await getTaskActivities({
            workspaceId,
            projectId,
            taskId,
        });

        return res.status(200).json({ success: true, activities });
    } catch (error) {
        console.error("Task activities error:", error);

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
