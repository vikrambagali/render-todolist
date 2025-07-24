const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Use this unified tasks array
let tasks = [];

app.get("/", function (req, res) {
  res.render("list", { tasks });
});

app.post("/", function (req, res) {
  const newTask = {
    title: req.body.ele1,
    priority: req.body.priority
  };
  tasks.push(newTask);
  res.redirect("/");
});

// ✅ NEW: Delete a task by index
app.post("/delete/:index", function (req, res) {
  const index = req.params.index;
  if (tasks[index]) {
    tasks.splice(index, 1);
  }
  res.redirect("/");
});

// ✅ NEW: Edit a task by index
app.post("/edit/:index", function (req, res) {
  const index = req.params.index;
  if (tasks[index]) {
    tasks[index] = {
      title: req.body.ele1,
      priority: req.body.priority
    };
  }
  res.redirect("/");
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
