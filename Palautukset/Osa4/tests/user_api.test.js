const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const User = require("../models/user");

const api = supertest(app);

const getAllUsers = async () => {
  const response = await api.get("/api/users");
  return response.body;
};

const usersForTests = [
  {
    username: "TestUser1",
    name: "test1",
    passwordHash: "123",
  },
  {
    username: "TestUser2",
    name: "test2",
    passwordHash: "234",
  },
  {
    username: "TestUser3",
    name: "test3",
    passwordHash: "345",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(usersForTests);
});

describe("Testing user creation scenarios", (async) => {
  test("User can be created with correct values", async () => {
    const initUsers = await getAllUsers();

    const newUser = {
      username: "TestUserapi",
      name: "test3",
      password: "345",
    };
    await api.post("/api/users").send(newUser).expect(201);

    const nowUsers = await getAllUsers();

    assert.strictEqual(initUsers.length + 1, nowUsers.length);
  });

  test("User with too short username errors out with 400 status", async () => {
    const newUser = {
      username: "Te",
      name: "test3",
      password: "345",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });
  test("User with too short password errors out with 400 status", async () => {
    const newUser = {
      username: "Tehbfsfhgdghadsgrkjytrketdjre",
      name: "test3",
      password: "3",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
