require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authController = require("./auth/auth.controller");
const userController = require("./user/user.controller");
const authenticateToken = require("./middleware/auth");
const mbtiController  = require("./mbti/mbti.controller");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes
app.post("/signup", authController.signUp);
app.post("/signin", authController.signIn);

app.get("/users", userController.getAllUsers);
app.get("/users/:id", authenticateToken, userController.getUserById);

// app.post("/mbti-test", authenticateToken, mbtiController.getMBTIResult);
app.post("/mbti-test", mbtiController.getMBTIResult);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
