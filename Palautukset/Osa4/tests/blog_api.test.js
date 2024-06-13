const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const Blog = require("../models/blog");

const api = supertest(app);

const testBlogs = [
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
  {
    title: "Type wars2",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testBlogs);
});

test("Get all test", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, testBlogs.length);
});

test("Test for blog format (JSON)", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("ensure that id is given in right format", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual("id" in response.body[0], true);
});

test("able to add blog successfully", async () => {
  const newBlog = {
    title: "addTest",
    author: "testPerson",
    url: "someSOMEsomeSOME.com",
    likes: 0,
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, testBlogs.length + 1);
  assert(contents.includes("addTest"));
});

test("likes value should be initialized to 0", async () => {
  const newBlog = {
    title: "likesTest",
    author: "testPerson",
    url: "someSOMEsomeSOME.com",
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body[response.body.length - 1].likes, 0);
});

test("Title and URL must be given", async () => {
  const testBlogNoTitle = {
    author: "testPerson",
    url: "someSOMEsomeSOME.com",
  };
  const testBlogNoUrl = {
    title: "this is test",
    author: "testPerson",
  };

  const testBlogCorrect = {
    url: "www.thisIsURL.com",
    title: "this is test",
    author: "testPerson",
  };

  await api.post("/api/blogs").send(testBlogNoTitle).expect(400);
  await api.post("/api/blogs").send(testBlogNoUrl).expect(400);
  await api.post("/api/blogs").send(testBlogCorrect).expect(201);
});

test("blog deletion successful with code 204", async () => {
  const allBlogs = await api.get("/api/blogs");
  const blogToDelete = allBlogs.body[allBlogs.body.length - 1];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const newBlogs = await api.get("/api/blogs");
  assert.strictEqual(newBlogs.body.length, allBlogs.body.length - 1);
});

test("blog update all values changed", async () => {
  const blog = await api.post("/api/blogs").send({
    title: "addTest",
    author: "testPerson",
    url: "someSOMEsomeSOME.com",
    likes: 0,
  });
  const updatedBlog = {
    title: "updated",
    author: "updated2",
    url: "updated3",
    likes: 1,
  };

  const response = await api
    .put(`/api/blogs/${blog.body.id}`)
    .send(updatedBlog)
    .expect(200);
  const newblogObject = response.body;

  assert.deepStrictEqual(blog.body.id, newblogObject.id);
  assert.deepStrictEqual(newblogObject.title, "updated");
  assert.deepStrictEqual(newblogObject.author, "updated2");
  assert.deepStrictEqual(newblogObject.url, "updated3");
});

after(async () => {
  await mongoose.connection.close();
});
