import { Router } from "express";
import {body} from "express-validator"; 
import * as projectController from "../controller/projectController.js";
import * as authMidlleware from "../midlleware/authMiddleware.js";
const router = Router();


router.post("/create",
     authMidlleware.authUser,
    // body('name').notEmpty().withMessage('Project name is required'),
    body('name').isString().withMessage('Project name is required'),
    projectController.createProject
)
router.get("/all",authMidlleware.authUser,
     projectController.getAllProjects
);
router.put("/add-user",authMidlleware.authUser,
         body('projectId').isString().withMessage('Project Id is required'),

     body("users").isArray({min:1}).withMessage("Users must be an array of strings").bail()
     .custom ((users)=>users.every(user=>typeof user==="string")).withMessage("each user must be a string"),
     projectController.addUserToProject
);

router.get("/get-project/:projectId",
     authMidlleware.authUser,
     projectController.getProjectById
)

export default router;