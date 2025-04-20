const express = require("express");
const router = express.Router();
const protect =  require("../middleware/authMiddleware");
const {registerUser, loginUser, updateUser, deleteUser} =  require("../controllers/authController.js");

router.post("/signup", registerUser)
router.post("/signin",loginUser)
router.put("/update",protect, updateUser)
router.delete("/delete",protect, deleteUser)

module.exports = router;
