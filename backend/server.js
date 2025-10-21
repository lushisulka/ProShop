import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set port
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// PayPal config route
app.get("/api/config/paypal", (req, res) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Upload folder static files
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Root route for testing API
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    // Serve any route not API
    app.get(/.*/, (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
}

// Error middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
