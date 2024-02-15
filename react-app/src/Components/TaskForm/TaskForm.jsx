import React from "react";
import "./TaskForm.css";

const TaskForm = ({ newTaskData, onChangeHandler, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <input
        type="text"
        id="new-task"
        name="newTask"
        value={newTaskData.newTask}
        onChange={onChangeHandler}
        placeholder="Enter New Task"
        data-testid="input"
      />
      <textarea
        type="text"
        id="new-task-description"
        name="newTaskDescription"
        value={newTaskData.newTaskDescription}
        onChange={onChangeHandler}
        placeholder="Enter Description for the New Task"
        data-testid="textarea"
      />
      <button type="submit" className="btn createtask-btn" data-testid="submit-button">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
