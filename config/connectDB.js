const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB connected ....");
  } catch (error) {
    console.log("fail to connect DB", error);
  }
};

module.exports = connectDB;
