const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default: "../../client/src/Assets/defaultPic.png",
  },
  cloudinary_id: String,
});

module.exports = User = mongoose.model("user", userSchema);
