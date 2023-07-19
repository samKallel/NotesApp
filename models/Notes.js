const mongoose = require("mongoose");

const schema = mongoose.Schema;

const notesSchema = new schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = Notes = mongoose.model("notes", notesSchema);
