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
      { expiresIn: "2h" }
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
      { expiresIn: "2h" }
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
    // console.log("Request Body:", req.body);
    // console.log("Request File:", req.file);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Supprimer l'ancienne image de Cloudinary
    if (user.cloudinary_id) {
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }

    const file = req.file;
    if (!file) {
      return res.status(400).send({ msg: "No file uploaded" });
    }
    // Télécharger la nouvelle image vers Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const data = {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      image: result.secure_url || user.image,
      cloudinary_id: result.public_id || user.cloudinary_id,
    };

    if (req.body.password) {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      data.password = hashPassword;
    }

    // Mettre à jour les données de l'utilisateur
    user.set(data);
    const updateUser = await user.save();

    const token = jwt.sign(
      {
        id: updateUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).send({ msg: "Profile Updated", updateUser, token });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(400).send({ msg: "Failed to update profile" });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const listUsers = await User.find();
    if (!listUsers || listUsers.length === 0) {
      return res.status(200).send({ msg: "You have no notes", listUsers: [] });
    }
    res.status(200).send({ msg: "liste de tous les users", listUsers });
  } catch (error) {
    res.status(400).send({ msg: "Failed to update profile" });
  }
};

module.exports.delUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).send({ msg: "User deleted successfully...", user });
    } else res.status(400).send({ msg: "User not found" });
  } catch (error) {
    res.status(400).send({ msg: "User deleted!!!" });
  }
};
