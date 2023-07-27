const express = require("express");

require("dotenv").config();
const app = express();

app.use(express.json());

const connectDB = require("./config/connectDB");
connectDB();

app.use("/api/user", require("./routes/user"));
app.use("/api/notes", require("./routes/notes"));

const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server started on Port ${PORT}`)
);
