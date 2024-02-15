const express = require("express");
const { DbConnection } = require("../createDbConnection");
const {
    handleGetAllTasks,
    handleCreateTask,
    handleDeleteById,
    handleUpdateTaskCompletedByID,
  } = require("../Controllers/tasks");
const router = express.Router();

const connectDb = DbConnection();

// getting all tasks and creating task in "/api/tasks" route
router
  .route("/")
  .get(handleGetAllTasks(connectDb))
  .post(handleCreateTask(connectDb));

// Update Completion Status of Task
router.patch(
  "/:taskId/complete",
  handleUpdateTaskCompletedByID(connectDb)
);

// Delete Task
router.delete("/:taskId", handleDeleteById(connectDb));



module.exports = router;