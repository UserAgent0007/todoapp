import express from "express";
import { getTasks, createTask, deleteTask, updateTask } from "./controllers/taskControllers.js";
import { authRequired } from "./middleware/auth.js";

import { validateTask } from "./middleware/validate.js";

const router = express.Router()

router.get("/", authRequired, getTasks);
router.post("/", authRequired, createTask);
router.delete('/:id', authRequired, deleteTask);
router.put("/:id", authRequired, updateTask);

export default router;