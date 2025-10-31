import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import taskRoutes from "./taskRoutes.js"

dotenv.config();
const app = express();

// --- CORS setup (allow only your UI domain) --- 
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3001"
app.use(
    cors({
        origin:allowedOrigin,
        methods:["GET", "POST", "DELETE", "PUT"],
        // запрошує перевірку користувача (логін, пароль, email)
        credentials:true
    })
);

// --- Middleware ---
// Він розбирає тіло запиту у JavaScript﻿-об’єкт і записує його у властивість req.body
app.use(express.json());

// --- Routes ---
app.use(
    
    taskRoutes
);

// --- DB Connection --- 
connectDB(process.env.MONGO_URI); 

// --- Start server --- 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 