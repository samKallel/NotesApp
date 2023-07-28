const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(401)
        .send({ errors: [{ msg: "Not authorized !! no token1232" }] });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findOne({ _id: decoded.id });
    if (!foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Not authorized !!  not found user" }] });
    }

    // Vérifie si l'utilisateur est un administrateur (isAdmin: true)
    if (!foundUser.isAdmin) {
      return res
        .status(401)
        .send({ errors: [{ msg: "Not authorized !! not Admin" }] });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    res.status(401).send({ errors: [{ msg: "Not authorized !!" }] });
  }
};

module.exports = isAdmin;
