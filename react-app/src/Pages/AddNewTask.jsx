import React, { useState } from "react";
import { useAddTaskMutation } from "../Redux/api/ApiSlice";
import TaskForm from "../Components/TaskForm/TaskForm";
import { toast } from "react-toastify";

const AddNewTask = () => {
  const [newTaskData, setNewTaskData] = useState({
    newTask: "",
    newTaskDescription: "",
  });

  const [addTask] = useAddTaskMutation();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewTaskData(() => ({
      ...newTaskData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      console.log("newTaskData", newTaskData);

      if (!newTaskData.newTask || !newTaskData.newTaskDescription) {
        return toast.error("Please fill out both task title and description.");
      }

      //send values to add task
      addTask({
        title: newTaskData.newTask,
        description: newTaskData.newTaskDescription,
        completed: false,
      });

      // Reset newTaskData after successful submission
      setNewTaskData({
        newTask: "",
        newTaskDescription: "",
      });

      toast.success("New Task is added successfully");
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="addnewtask container">
      <h2 className="title">Add New Task</h2>
      <TaskForm
        newTaskData={newTaskData}
        onChangeHandler={onChangeHandler}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddNewTask;
