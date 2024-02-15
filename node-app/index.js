const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const taskRouter = require('./Routes/tasks')

dotenv.config();

const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/tasks", taskRouter)

app.listen(PORT, (error) => {
  if (error) {
    console.log("The Server Did not start: ", error);
  }
  console.log(`The Server is running on http://localhost:${PORT}`);
});
