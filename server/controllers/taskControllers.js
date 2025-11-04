import { Task } from "../models/task.js";

export const getTasks = async (req, res) => {

    try {
        console.log("Get tasks endpoint reached");
        const tasks = await Task.find({user:req.user.user_id});
        
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createTask = async (req, res) => {
    try {

        const {name_task, description, checked} = req.body;
        
        const task = new Task({
            name_task:name_task,
            description:description,
            checked:checked,
            user:req.user.user_id
        });    
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