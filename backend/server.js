const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// Import routes
const quizRoutes = require("./routes/quiz.route");
const userRoutes = require("./routes/auth.route");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", userRoutes);

// Connect to MongoDB
connectDB()

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
