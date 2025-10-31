import express from "express";
import { getTasks, createTask, deleteTask, updateTask } from "./controllers/taskControllers.js";

import { validateTask } from "./middleware/validate.js";

const router = express.Router()

router.get("/", getTasks);
router.post("/", createTask);
router.delete('/:id', deleteTask);
router.put("/:id", updateTask);

export default router;