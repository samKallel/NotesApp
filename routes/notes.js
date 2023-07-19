const express = require("express");
const {
  getAll,
  getNote,
  addNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

router.get("/test", (req, res) => {
  res.send("TEST");
});

router.get("/:id", getNote);
router.post("/add", isAuth, addNote);
router.get("/all", isAuth, getAll);
router.put("/:id", isAuth, updateNote);
router.delete("/:id", isAuth, deleteNote);

module.exports = router;
