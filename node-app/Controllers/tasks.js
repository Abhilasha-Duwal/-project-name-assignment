const handleGetAllTasks = (connectDb) => (req, res) => {
  const sqlGet = "SELECT * FROM tasks";
  connectDb.all(sqlGet, (error, rows) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    // Convert completed values from numbers to booleans
    const tasks = rows.map((task) => ({
      ...task,
      completed: task.completed === 1 ? true : false,
    }));

    res.json(tasks);
  });
};

const handleCreateTask = (connectDb) => (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  const sqlInsert = "INSERT INTO tasks (title, description) VALUES (?, ?)";
  connectDb.run(sqlInsert, [title, description], function (error) {
    if (error) {
      console.error("Error inserting task:", error.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res
      .status(201)
      .json({ taskId: this.lastID, message: "Task created successfully" });
  });
};

const handleUpdateTaskCompletedByID = (connectDb) => async (req, res) => {
  const taskId = req.params.taskId;
  let { completed } = req.body;

  // Convert string "true" and "false" to boolean values
  if (typeof completed === "string") {
    completed = completed === "true";
  }

  // Validate the completion status
  if (typeof completed !== "boolean") {
    return res.status(400).json({
      error:
        "Invalid value for 'completed'. It must be either true, false, or a boolean value.",
    });
  }

  try {
    const sqlUpdate = "UPDATE tasks SET completed = ? WHERE id = ?";
    await connectDb.run(sqlUpdate, [completed ? 1 : 0, taskId]);

    // Check if any rows were affected
    if (this.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task completion status updated successfully",
      completed: completed,
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteById = (connectDb) => (req, res) => {
  const taskId = req.params.taskId;

  const sqlDelete = "DELETE FROM tasks WHERE id = ?";

  connectDb.run(sqlDelete, taskId, function (error) {
    if (error) {
      console.error("Error deleting task:", error.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json({ message: "Task deleted successfully" });
  });
};

module.exports = {
  handleGetAllTasks,
  handleCreateTask,
  handleUpdateTaskCompletedByID,
  handleDeleteById,
};
