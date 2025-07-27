const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo");

    const taskSchema = new mongoose.Schema({
      name: String,
      priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Low"
      }
    });

    const Task = mongoose.model("Task", taskSchema);

    // Default tasks to insert if DB empty
    const defaultTasks = [
      new Task({ name: "Create some Videos", priority: "Medium" }),
      new Task({ name: "Learn DSA", priority: "High" }),
      new Task({ name: "Learn React", priority: "Medium" }),
      new Task({ name: "Take Some Rest", priority: "Low" }),
    ];

    app.get("/", async (req, res) => {
      try {
        const foundTasks = await Task.find({});

        if (foundTasks.length === 0) {
          await Task.insertMany(defaultTasks);
          return res.redirect("/");
        }

        res.render("list", { tasks: foundTasks });
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred.");
      }
    });

    // Add new task
    app.post("/", async (req, res) => {
      try {
        const taskName = req.body.ele1;
        const taskPriority = req.body.priority || "Low";

        const newTask = new Task({
          name: taskName,
          priority: taskPriority
        });

        await newTask.save();
        res.redirect("/");
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred.");
      }
    });

    // Delete task
    app.post("/delete", async (req, res) => {
      try {
        const checkedId = req.body.checkbox1;
        await Task.findByIdAndDelete(checkedId);
        console.log("Deleted task:", checkedId);
        res.redirect("/");
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred.");
      }
    });

    // Edit form GET
    app.get("/edit/:id", async (req, res) => {
      try {
        const task = await Task.findById(req.params.id);
        res.render("edit", { task });
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load edit page.");
      }
    });

    // Edit form POST
    app.post("/edit/:id", async (req, res) => {
      try {
        const updatedName = req.body.updatedName;
        const updatedPriority = req.body.updatedPriority || "Low";

        await Task.findByIdAndUpdate(req.params.id, {
          name: updatedName,
          priority: updatedPriority
        });
        res.redirect("/");
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update task.");
      }
    });

    app.listen(8000, () => {
      console.log("Server started on port 8000");
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
