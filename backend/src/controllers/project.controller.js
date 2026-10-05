import { createProject } from "../services/project.service.js";

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
