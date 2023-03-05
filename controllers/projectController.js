const Project = require("../models/projectModel");
const mongoose = require("mongoose");

//get all projects
const getAllProjects = async (req, res) => {
  const projects = await Project.find({});

  res.status(200).json(projects);
};

//get a single project
const getSingleProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "No project found" });
  }

  res.status(200).json(project);
};

//post a new project
const postProject = async (req, res) => {
  const data = req.body;

  try {
    //saved as project on db
    const project = await Project.create({
      ...data,
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  res.json({ message: "POST a  project" });
};

//delete a project

//update a project

module.exports = {
  postProject,
  getAllProjects,
  getSingleProject,
};
