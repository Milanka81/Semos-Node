const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://Milanka:coW21rexULkY7m57@milanka.pfwlgqs.mongodb.net/MoviesDatabase?retryWrites=true&w=majority&appName=Milanka";

// "mongodb+srv://Milanka:coW21rexULkY7m57@milanka.pfwlgqs.mongodb.net/UsersValidateDatabase?retryWrites=true&w=majority&appName=Milanka";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Connection error: ", err));

module.exports = mongoose;
