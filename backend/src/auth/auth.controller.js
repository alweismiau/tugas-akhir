const authService = require("./auth.service");

// ✅ Sign Up Endpoint
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await authService.registerUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Sign In Endpoint (diperbaiki)
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message }); // 🔥 Pastikan ini mengembalikan error yang benar!
  }
};

module.exports = { signUp, signIn };
