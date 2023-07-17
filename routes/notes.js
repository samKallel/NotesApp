const express = require("express");
const {
  getAll,
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("TEST");
});

router.get("/:id", getNotes);
router.post("/add", addNote);
router.get("all", getAll);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
