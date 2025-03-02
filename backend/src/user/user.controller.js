const prisma = require("../db");

// ✅ Endpoint untuk mendapatkan profil user yang sedang login
const getUserById = async (req, res) => {
//   try {
//     const userId = req.user.id; // ID dari token JWT

//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: { id: true, name: true, email: true, mbtiResult: true }, 
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };
try {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }, 
    select: { id: true, name: true, email: true, mbtiResult: true }, 
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
} catch (error) {
  res.status(500).json({ message: "Server error", error: error.message });
}
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, mbtiResult: true },
    });

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



module.exports = { getUserById, getAllUsers };
