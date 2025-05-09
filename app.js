require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");
const { MONGO_DB_CONNECTION } = require("./utils/config");
const limiter = require("./middlewares/limiter");

const { PORT = 3002 } = process.env;

const app = express();
app.use(express.json());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(limiter);

// Database connection
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_DB_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Logging
app.use(requestLogger);

// Routes
app.use(mainRouter);

// Error Logging
app.use(errorLogger);

// Celebrate Error Handler
app.use(errors());

// Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
