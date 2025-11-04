import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "name is required"],
            maxlength:[50, "name is too long"]
        },
        email:{
            type:String,
            required:[true, "name is required"],
            maxlength:[50, "name is too long"],
            default: "example@gmail.com"
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: [8, "password must be at least 8 symbols"],
            maxlength: [100, "password is too long"],
            // select: false // при запиті клієнт не отримує це поле
        }
    },
    { versionKey: false }
);

userSchema.pre("save", async function (){
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10); // спосіб хешування
    this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model("User", userSchema);