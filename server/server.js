import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import taskRoutes from "./taskRoutes.js";
import authRoutes from "./authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// --- CORS setup (allow only your UI domain) --- 
const allowedOrigin = process.env.CLIENT_ORIGIN.split(",")
app.use(
    cors({
        origin:(origin, callback)=>{
            if (!origin){
                return callback(null, true); // повертаємо дозвіл чи можна виконувати будь-які запити, 1 параметр чи буде передана помилка error, 2 параметр - дозвіл на доступ
            }

            if (allowedOrigin.includes(origin)){
                return callback(null ,true);
            }

            return callback (new Error("Not allowed by CORS"), false);
        },
        methods:["GET", "POST", "DELETE", "PUT"],
        // запрошує перевірку користувача (логін, пароль, email)
        credentials:true
    })
);

// --- Middleware ---
// Він розбирає тіло запиту у JavaScript﻿-об’єкт і записує його у властивість req.body
app.use(cookieParser());
app.use(express.json());

// --- Routes ---
app.use(
    
    taskRoutes,
    authRoutes
);

// --- DB Connection --- 
connectDB(process.env.MONGO_URI); 

// --- Start server --- 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 