const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./api/user/router");
const path = require("path");
const cors = require('cors');
const policyRoutes = require('./api/Policy/router');
const formRouter = require('./api/Policy/formRouter'); // Import the formRouter

dotenv.config();

const app = express();
app.use(cors()); // This will allow all domains by default
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());

// API Routes
app.use("/api/user", userRouter);
app.use('/api/policy', policyRoutes);
app.use('/api/form', formRouter); // Use the formRouter

// Serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});