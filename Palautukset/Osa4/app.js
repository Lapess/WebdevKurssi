const config = require("./utils/config");
const express = require("express");
const logger = require("./utils/logger");
require("express-async-errors");
const cors = require("cors");

//controllers
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const app = express();

mongoose.set("strictQuery", false);

logger.info("connecting to mongodb.....");
const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then((res) => {
  logger.info("connection to mongodb established succesfully");
});

app.use(express.json());
app.use(cors());
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
