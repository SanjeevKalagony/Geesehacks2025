// const express = require("express");
// const { Sequelize, DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // Initialize Sequelize
// const sequelize = new Sequelize(process.env.POSTGRES_URI, {
//     dialect: "postgres",
//     logging: false,
// });

// // Define User Model
// const User = sequelize.define("User", {
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//     firstname: { type: DataTypes.STRING, allowNull: false }, 
//     lastname: { type: DataTypes.STRING, allowNull: false }
// });

// // Sync Database
// sequelize.sync()
//     .then(() => console.log("PostgreSQL connected & tables created."))
//     .catch((err) => console.log(err));

// const router = express.Router();

// // Register Route
// router.post("/register", async (req, res) => {
//     try {
//         const { email, password, firstname, lastname } = req.body;

//         // Check if the email already exists
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ error: "Email already registered" });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({ email, password: hashedPassword, firstname, lastname });

//         // Generate JWT token after successful registration
//         // const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.status(201).json({
//             message: "User registered successfully",
//             // token,
//             user: { id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email },
//         });
//     } catch (err) {
//         console.error("Registration failed:", err);
//         res.status(500).json({ error: "Registration failed" });
//     }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({ error: "User not found" });
//         }

//         // Check if password matches
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         // Generate JWT token after successful login
//         // const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.json({
//             message: "Login successful",
//             // token,
//             user: { id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email },
//         });
//     } catch (err) {
//         console.error("Login failed:", err);
//         res.status(500).json({ error: "Login failed" });
//     }
// });

// module.exports = router;
