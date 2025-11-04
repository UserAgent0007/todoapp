import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        name_task: {
            type: String,
            required: [true, "name is rquired"],
            trim: true,
            minlength: [5, "name must be at list 5 symbols"]
        },

        description: {
            type: String,
            required: [true, "description is rquired"],
            maxlength: [50, "description is too long"],
        },

        checked: {
            type: Boolean,
            default: false
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true // кожне завдання має бути прив’язане до користувача
        }

    },

    { versionKey: false }
)

export const Task = mongoose.model("Task", taskSchema);