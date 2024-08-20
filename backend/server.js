const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// Import routes
const quizRoutes = require("./routes/quizRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);

// Connect to MongoDB
connectDB()

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
