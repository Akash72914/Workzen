import {
    createProject,
    getProjectById,
    getWorkspaceProjects,
    updateProject,
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

export const getProjectController = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const workspaceId = req.params.workspaceId;

        const project = await getProjectById({ projectId, workspaceId });

        if (!project) {
            return res
                .status(404)
                .json({ success: false, message: "Project not found" });
        }

        return res.status(200).json({ success: true, project });
    } catch (error) {
        console.log("Get project error:", error);

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const updateProjectController = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const workspaceId = req.params.workspaceId;
        const { name, description, status } = req.body;

        const project = await updateProject({
            projectId,
            workspaceId,
            name,
            description,
            status,
        });

        if (!project) {
            return res
                .status(404)
                .json({ success: false, message: "Project not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project,
        });
    } catch (error) {
        console.log("Update project error:", error);

        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
