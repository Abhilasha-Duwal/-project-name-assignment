const handleGetAllTasks = (connectDb) => (req, res) => {
  const sqlGet = "SELECT * FROM tasks";
  connectDb.all(sqlGet, (error, rows) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows);
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

const handleUpdateTaskCompletedByID = (connectDb) => (req, res) => {
  const taskId = req.params.taskId;
  let { completed } = req.body;

  // Convert string "true" and "false" to 1 and 0 respectively
  if (completed === true) {
    completed = 1;
  } else if (completed === false) {
    completed = 0;
  }

  // Validate the completion status
  if (typeof completed !== "number" || (completed !== 0 && completed !== 1)) {
    return res.status(400).json({
      error: "Invalid value for 'completed'. It must be either true or false.",
    });
  }

  // Convert completed value back to boolean
  completed = !!completed;

  const sqlUpdate = "UPDATE tasks SET completed = ? WHERE id = ?";
  connectDb.run(sqlUpdate, [completed, taskId], function (error) {
    if (error) {
      console.error("Error updating task:", error.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    // Convert boolean completed value to string "true" or "false"
    const completedValue = completed ? true : false;
    res.json({
      message: "Task completion status updated successfully",
      completed: completedValue,
    });
  });
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
