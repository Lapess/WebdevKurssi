const config = require("./utils/config");
const express = require("express");
const logger = require("./utils/logger");
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const app = express();

logger.info("connecting to mongodb.....");
const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then((res) => {
  logger.info("connection to mongodb established succesfully");
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.use(middleware.errorHandler);

module.exports = app;
