const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const authService = require("./middleware/auth");
require("./config/db");
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use("/auth", authRoutes);

app.use(
  fileUpload({
    limits: { fileSize: 2 * 1024 * 1024 }, // 30 MB
    abortOnLimit: true,
  })
);

// // Middleware za autentikaciju (dummy autentikacija za primer)
// const auth = (req, res, next) => {
//   // Simulacija autentikacije
//   req.user = { id: "user1234" }; // Primer korisničkog ID-a
//   next();
// };

//Korisnik koji nije ranije uneo nijedan dokument

const createUserDirectory = (userId) => {
  const userDir = path.join(__dirname, "uploads", userId);
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }
};

app.post("/upload", authService.authenticate, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files attached");
  }

  /////////////////////////////////// provere
  let fileTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  let maxFileSize = 1024 * 1024;

  if (!fileTypes.includes(req.files.file.mimetype)) {
    return res.status(400).send("Bad request - invalid format");
  }
  if (maxFileSize < req.files.file.size) {
    return res.status(400).send("Bad request - file is too large");
  }

  /////////////////////////////////////////////

  const file = req.files.file;

  const userId = req.userId;
  createUserDirectory(userId);

  const uploadPath = path.join(__dirname, "uploads", userId, file.name);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  res.send("file uploaded");
});

app.get("/files/:filename", authService.authenticate, (req, res) => {
  const userId = req.userId;
  const { filename } = req.params;

  const filePath = path.join(__dirname, "uploads", userId, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(400).send("File not found");
  }
  res.sendFile(filePath);
});

app.listen(PORT, "localhost", () => {
  console.log("server connected");
});
