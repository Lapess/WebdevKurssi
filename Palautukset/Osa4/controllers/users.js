express = require("express");
const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");
const logger = require("../utils/logger");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length <= 2) {
    logger.error("password have to be atleast 3 characters long");
    return response
      .status(400)
      .json({ error: "password have to be atleast 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newuser = new User({
    username,
    name,
    passwordHash,
  });

  const savedNewUser = await newuser.save();

  response.status(201).json(savedNewUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});

  response.json(users);
});

module.exports = usersRouter;
