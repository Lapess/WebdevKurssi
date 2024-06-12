const blogsRouter = require("express").Router();
const { request, response } = require("../../../KurssinSeuranta/part4/app");
const note = require("../../../KurssinSeuranta/part4/models/note");
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/id/", async (request, response, next) => {
  await note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
