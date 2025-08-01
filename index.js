const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Replace with your actual MongoDB URI
const MONGODB_URI = "mongodb+srv://28vikram20:Vikram1234@cluster0.dgblvhy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/todoDB"; // For MongoDB Atlas

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const taskSchema = new mongoose.Schema({
      name: String,
      priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Low",
      },
    });

    const Task = mongoose.model("Task", taskSchema);

    const defaultTasks = [
      new Task({ name: "Create some Videos", priority: "Medium" }),
      new Task({ name: "Learn DSA", priority: "High" }),
      new Task({ name: "Learn React", priority: "Medium" }),
      new Task({ name: "Take Some Rest", priority: "Low" }),
    ];

    // Home page
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

    // Add task
    app.post("/", async (req, res) => {
      try {
        const taskName = req.body.ele1;
        const taskPriority = req.body.priority || "Low";

        const newTask = new Task({
          name: taskName,
          priority: taskPriority,
        });

        await newTask.save();
        res.redirect("/");
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred.");
      }
    });

    // Delete task
    app.delete("/delete/:id", async (req, res) => {
      try {
        const id = req.params.id;
        await Task.findByIdAndDelete(id);
        console.log("Deleted task:", id);
        res.status(200).json({ message: "Task deleted successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting the task" });
      }
    });

    // Update task using PATCH (partial update)
    app.patch("/edit/:id", async (req, res) => {
      try {
        const updates = {};
        if (req.body.updatedName) updates.name = req.body.updatedName;
        if (req.body.updatedPriority) updates.priority = req.body.updatedPriority;

        await Task.findByIdAndUpdate(req.params.id, updates);

        res.status(200).json({ message: "Task updated successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update task." });
      }
    });

    // Start server
    app.listen(8000, () => {
      console.log("🚀 Server started on http://localhost:8000");
    });
  } catch (err) {
    console.error("❌ Connection error:", err);
  }
}

run();
