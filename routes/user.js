const express = require("express");
const {
  registerUser,
  loginUser,
  updateProfile,
  getUsers,
  delUser,
} = require("../controllers/user");
const upload = require("../util/multer");
const {
  registerValidation,
  loginValidation,
  validation,
} = require("../middlewares/validator");

const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  registerValidation(),
  validation,
  registerUser
);
router.post("/login", loginValidation(), validation, loginUser);
router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});
router.put("/profile", upload.single("image"), isAuth, updateProfile);
router.get("/allUsers", isAdmin, getUsers);
router.delete("/:id", isAdmin, delUser);

module.exports = router;
