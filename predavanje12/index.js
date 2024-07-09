const express = require("express");
const mongoose = require("mongoose");

//mongodb+srv://Milanka:bolero1910@milanka.pfwlgqs.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority&appName=Milanka
const MONGODB_URI =
  "mongodb+srv://Milanka:coW21rexULkY7m57@milanka.pfwlgqs.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority&appName=Milanka";

const app = express();

app.use(express.json());

const User = require("./models/UserMongoose");

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Connection error: ", err));

app.post("/users", (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(400).json({ error: err.message }));
});
app.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.put("/users/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.delete("/users/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User has been deleted" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

const PORT = 3000;

app.listen(PORT, "localhost", () => {
  console.log("server connected");
});
