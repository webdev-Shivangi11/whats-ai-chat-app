import { Router } from "express";
import * as genAiController from "../controller/genAiController.js"
const router=Router()

router.get('/get-result',genAiController.getResult)


export default router;