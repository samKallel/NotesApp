const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const cloudinary = require("../util/cloudinary.js");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).send({ msg: "User already exists!!!" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    newUser.password = hashPassword;
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .send({ msg: "User registered successfully...", User: newUser, token });
  } catch (error) {
    res.status(500).send({ msg: "User cannot register!!!" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password, image } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res.status(400).send({ error: [{ msg: "Bad credential" }] });
    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword)
      return res.status(400).send({ error: [{ msg: "Bad credential" }] });

    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .send({ msg: "login successfully .. ", user: foundUser, token });
  } catch (error) {
    res.status(400).send({ msg: "can not  login User!!!" });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    console.log(user);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;

    // user.profile_img = result.secure_url || user.profile_img; // Met à jour le champ profile_img
    // user.cloudinary_id = result.public_id || user.cloudinary_id; // Met à jour le champ cloudinary_id

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();
    const token = jwt.sign(
      {
        id: updateUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({ msg: "Profile Updated", updateUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Delete image from cloudinary
// Upload new image to cloudinary
//     const data = {
//       name: req.body.name || user.name,
//       profile_img: result.secure_url || user.profile_img,
//       cloudinary_id: result.public_id || user.cloudinary_id,
//     };
//     user = await User.findByIdAndUpdate(req.params.id, data, {
//       new: true,
//     });
//     res.status(200).send(user);
//
// };
