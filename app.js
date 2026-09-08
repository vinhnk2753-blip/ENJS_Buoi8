require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Library API is running" });
});

app.use("/books", bookRoutes);

// 404 cho các route không tồn tại
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Cannot start server:", error.message);
    process.exit(1);
  }
}

startServer();
