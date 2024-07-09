const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs").promises;

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// const blogsFilePath = path.join(__dirname, "blogs.json");
//mongodb+srv://Milanka:bolero1910@milanka.pfwlgqs.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority&appName=Milanka
const MONGODB_URI =
  "mongodb+srv://Milanka:coW21rexULkY7m57@milanka.pfwlgqs.mongodb.net/BlogDatabase?retryWrites=true&w=majority&appName=Milanka";

app.use(express.json());

// const User = require("./models/UserMongoose");
const Blog = require("./models/BlogEntity");

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Connection error: ", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const admin = req.query.admin === "true";
    // const admin = req.query.admin === "true";
    // const data = await fs.readFile(blogsFilePath, "utf-8");
    const blogs = await Blog.find().lean();
    res.render("index", { blogs, admin });
  } catch (error) {
    res.status(500).send("Error : ", +error);
  }
});
app.get("/blog/:id", async (req, res) => {
  const blogId = req.params.id;
  try {
    // const data = await fs.readFile(blogsFilePath, "utf-8");
    // const blogs = JSON.parse(data);
    // const blog = blogs.find((blog) => blog.id === blogId);
    const blog = await Blog.findById(req.params.id).lean();
    if (blog) {
      res.render("blog", { blog });
    } else {
      res.status(404).send("Blog is not found");
    }
  } catch (error) {
    res.status(500).send("Error : ", +error);
  }
});

app.post("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  const { content } = req.body;
  try {
    // const data = await fs.readFile(blogsFilePath, "utf-8");
    // const blogs = JSON.parse(data);
    // const blog = blogs.find((blog) => blog.id === blogId);
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $push: { posts: content } },
      { new: true, runValidators: true }
    );

    if (blog) {
      // blog.posts.push(content);
      // await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
      res.redirect("/blog/" + blogId);
    } else {
      res.status(404).send("Blog is not found");
    }
  } catch (error) {
    res.status(500).send("Error : ", +error);
  }
});

app.post("/blog/new", async (req, res) => {
  const { title } = req.body;
  try {
    // const data = await fs.readFile(blogsFilePath, "utf-8");
    // const blogs = JSON.parse(data);
    // const newBlog = {
    //   id: (blogs.length + 1).toString(),
    //   title: title,
    //   posts: [],
    // };
    const newBlog = new Blog({ title: title, posts: [] });
    // blogs.push(newBlog);
    // await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
    await newBlog.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error : ", +error);
  }
});
app.get("/statistics", (req, res) => {
  const results = {
    blogsCount: undefined,
    postsCount: undefined,
  };
  res.render("statistics", results);
});
app.post("/statistics", async (req, res) => {
  const results = {
    blogsCount: undefined,
    postsCount: undefined,
  };

  if (req.body.postsCount) {
    const postsCount = await Blog.aggregate([
      { $project: { title: 1, postsCount: { $size: "$posts" } } },
    ]);
    results.postsCount = postsCount;
  }
  if (req.body.blogsCount) {
    const blogsCount = await Blog.countDocuments();
    results.blogsCount = blogsCount;
  }
  res.render("statistics", results);
});
app.listen(PORT, "localhost", () => {
  console.log("server connected");
});
