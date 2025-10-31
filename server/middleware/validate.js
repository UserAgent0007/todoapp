export const validateTask = (req, res, next) => {
    const {name, description, checked} = req.body;

    if (!name || !description || !checked || typeof description !== "string" ||  typeof name !== "string" || name.trim().length < 2 || description.trim().length < 2){
        return res
            .status(400)
            .json({message: "Invalid data for task"});
    }

    next();
};