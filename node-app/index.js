const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("The Server Did not start: ", error);
  }
  console.log(`The Server is running on http://localhost:${PORT}`);
});
