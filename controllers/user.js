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
      { expiresIn: "24h" }
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
    const { email, password } = req.body;
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
