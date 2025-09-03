import projectModel from "../model/projectModel.js";
import * as projectService from "../services/projectServices.js";

import userModel from "../model/userModel.js";
import { validationResult } from 'express-validator';


export const createProject = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const userId = loggedInUser._id;

        const newProject = await projectService.createProject({ name, userId });

        res.status(201).json(newProject);

    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }


}
export const getAllProjects=async(req,res)=>{
    try{
const loggedInUser=await userModel.findOne({
    email:req.user.email
})
const allUserProjects=await projectService.getAllProjectByUserId({
    userId:loggedInUser._id
})
return res.status(200).json({
    projects:allUserProjects
})
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err.message})
        
    }
}
export const addUserToProject=async(req,res)=>{
    const errors=validationResult(req)
   if(!errors.isEmpty()){
    console.log(errors);
    
  return res.status(400).json({errors:errors.array()})
}
    try{
        const {projectId,users}=req.body
        const loggedInUser=await  userModel.findOne({
            email:req.user.email
        })
        
        const project=await projectService.addUsersToProject({
            projectId,users,userId:loggedInUser._id
        })
        return res.status(200).json({
            project
        })
    }catch(err){
        console.log(err)
        res.status(400).json({error:err.meaasge});
        
    }
}

export const getProjectById=async(req,res)=>{
    const {projectId}=req.params
    try{
const project=await projectService.getProjectById(
    {projectId})
return res.status(200).json({
    project
})

    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err.message});
        
    }
}



// export const getProjectById = async (req, res) => {
//   const { projectId } = req.params;

//   try {
//     const project = await projectService.getProjectById(projectId); // Pass ID directly

//     if (!project) {
//           console.error("project not found");
//       return res.status(404).json({ error: "Project not found" });
//     }

//     return res.status(200).json({ project });
//   } catch (err) {
//     console.error("Error fetching project:", err);
//     res.status(500).json({ error: err.message || "Internal Server Error" });
//   }
// };
