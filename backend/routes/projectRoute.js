import { Router } from "express";
import {body} from "express-validator"; 
import * as projectController from "../controller/projectController.js";
import * as authMidlleware from "../midlleware/authMidlleware.js";
const router = Router();


router.post("/create",
     authMidlleware.authUser,
    body('name').notEmpty().withMessage('Project name is required'),
    projectController.createProject
)
// router.get("/", projectController.getAllProjectsByUserId);
export default router;