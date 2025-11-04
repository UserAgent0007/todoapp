import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name: name,
            email: email,
            password: password
        })

        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }

}

export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        res.status(404).json({ message: "User not found" });
    }

    const compare = bcrypt.compare(user.password, password);

    if (!compare) {
        res.status(401).json({ message: "invalid credentials" });
    }

    const token = jwt.sign(
        { user_id: user._id, user_name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie('jwt_token', `Bearer ${token}`, {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ user: user.name });

}

export const authCheck = (req, res) => {
    res.status(200).json({ message: "user is authenticated" });
}

export const logOut = (req, res) => {

    res.clearCookie('jwt_token', {
        httpOnly: true,
        sameSite: 'Strict'
    });

    res.status(200).json({message:"succsessfully loged out"});
}