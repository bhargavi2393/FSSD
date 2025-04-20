require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/authRoutes")
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(express.json());

app.use("/api/v1", authRoutes);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});    