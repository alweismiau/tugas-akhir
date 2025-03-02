// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const authRepository = require("./auth.repository");
// require("dotenv").config();

// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined in .env file");
// }

// // Regex Validasi
// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// // ✅ Register User (Sign Up)
// const registerUser = async (name, email, password) => {
//   if (!name || name.trim().length < 3) {
//     throw new Error("Name must be at least 3 characters long");
//   }

//   if (!emailPattern.test(email)) {
//     throw new Error("Invalid email format");
//   }

//   if (!passwordPattern.test(password)) {
//     throw new Error("Password must contain at least 8 characters, including one letter and one number");
//   }

//   const existingUser = await authRepository.findUserByEmail(email);
//   if (existingUser) {
//     throw new Error("Email already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = await authRepository.createUser(name, email, hashedPassword);

//   return { message: "User registered successfully", user: newUser };
// };

// // ✅ Login User (Sign In)
// const loginUser = async (email, password) => {
//   if (!emailPattern.test(email)) {
//     throw new Error("Invalid email format");
//   }

//   const user = await authRepository.findUserByEmail(email);
//   if (!user) {
//     throw new Error("Invalid email or password");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Invalid email or password");
//   }

//   const token = jwt.sign(
//     { id: user.id, email: user.email },
//     JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   return {
//     message: "Login successful",
//     token,
//     user: { id: user.id, name: user.name, email: user.email },
//   };
// };

// module.exports = { registerUser, loginUser };

const prisma = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register User
const registerUser = async (name, email, password) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

// ✅ Login User (diperbaiki)
const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password"); // 🔥 Perbaikan 1: Jika email tidak ditemukan
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password"); // 🔥 Perbaikan 2: Jika password salah
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user: { id: user.id, name: user.name, email: user.email } };
};

module.exports = { registerUser, loginUser };
