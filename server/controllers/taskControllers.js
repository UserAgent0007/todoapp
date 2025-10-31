import { Task } from "../models/task.js";

export const getTasks = async (req, res) => {

    try {
        console.log("Get tasks endpoint reached");
        const tasks = await Task.find();
        console.log(tasks);
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createTask = async (req, res) => {
    try {
        console.log("rECEIVED BODY")

        const task = new Task(req.body);
        console.log("CREATED TASK");
        await task.save();
        res.status(201).json(task);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedItem = await Task.findByIdAndDelete(id)

        if (!deletedItem) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    }
    catch (err) {

        res.status(500).json({ message: err.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        
        console.log("UPDATED TASK ENTER")
        const { id } = req.params;

        const updatedItem = await Task.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true // використовується базова валідація використовуючи те, що було вказано у в описі моделі
        });

        if (!updatedItem) {
            return res.status(400).json({ message: "Can’t find an object in db" });
        }

        res.json(updatedItem)
    }
    catch (err){
        res.status(400).json({message:err.message})
    }
}