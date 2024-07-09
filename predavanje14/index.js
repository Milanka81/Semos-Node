const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use("/users", userRoutes);

const MONGODB_URI =
  "mongodb+srv://Milanka:coW21rexULkY7m57@milanka.pfwlgqs.mongodb.net/UsersValidateDatabase?retryWrites=true&w=majority&appName=Milanka";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Connection error: ", err));

app.listen(PORT, "localhost", () => {
  console.log("server connected");
});
