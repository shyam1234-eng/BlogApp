import express from "express";
import methodOverride from "method-override";
import { blogs as importedBlogs } from "./data/blogs.js";

const app = express();
const port = 3000;

let blogs = importedBlogs;

app.set("view engine", "ejs");
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
app.use(methodOverride("_method"));

// let blogs = [];
app.get("/", (req, res) => {
  res.render("index", { blogs });
});
app.get("/createPost", (req, res) => {
  res.render("createPost");
});
app.post("/createPost", (req, res) => {
  const newBlog = req.body;
  const blogEntry = {
    id: String(blogs.length + 1),
    title: newBlog.title || "Untitled",
    summary: newBlog.summary || "No summary provided.",
    author: { name: newBlog.author || "Unknown" },
    publishedAt: newBlog.publishedAt || new Date().toISOString(),
  };

  blogs.push(blogEntry);
  // console.log("Parsed body:", newBlog);
   console.log("after push:", blogs);
  res.redirect("/");
});
app.get("/edit/:id",(req,res)=>{
  const blog = blogs.find((b)=> b.id === req.params.id);
  if (!blog) return res.status(404).send("Blog not found");
  res.render("editPost", {blog});
});
app.patch("/patch/:id",(req,res)=>{
  const blog = blogs.find((b)=> b.id === req.params.id);
  if (!blog) return res.status(404).send("Blog not found");

  Object.assign(blog, req.body);
  res.redirect("/");
});

app.delete("/delete/:id",(req,res)=>{
  blogs = blogs.filter(blog => blog.id !== req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server runnin on port ${port}.`);
});
