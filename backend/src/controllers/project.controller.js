import {
    createProject,
    getWorkspaceProjects,
} from "../services/project.service.js";

export const createProjectController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const name = req.body.name;
        const description = req.body.description;

        const project = await createProject({ workspaceId, name, description });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        console.log(error);

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getProjectsController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;

        const projects = await getWorkspaceProjects({ workspaceId });

        return res.status(200).json({ success: true, projects });
    } catch (error) {
        console.log("Get projects error:", error);

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
