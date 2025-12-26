const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const booksRoutes = require("./routes/books");
const seatsRoutes = require("./routes/seats");
const realtimeRoutes = require("./routes/realtime");
const { setupRealtime } = require("./controllers/realtimeController");
const { connectDB } = require("./config/db");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/seats", seatsRoutes);
app.use("/api/realtime", realtimeRoutes);

// static for client build (optional)
// app.use(express.static(path.join(__dirname, "../dist")));

// DB
connectDB();

// Socket setup
setupRealtime(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
