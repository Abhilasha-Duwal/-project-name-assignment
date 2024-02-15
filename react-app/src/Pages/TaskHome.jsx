import React from "react";
import TaskList from "../Components/TaskTable/TaskList";
import "./CSS/TaskHome.css";
import { useNavigate } from "react-router-dom";
import { useGetTasksQuery } from "../Redux/api/ApiSlice";
import ErrorFetchingData from "../Components/ErrorFetchingData/ErrorFetchingData";

const TaskHome = () => {
  const { isLoading, error } = useGetTasksQuery();
  const navigate = useNavigate();

  return isLoading ? (
    <p className="small-txt">Loading...</p>
  ) : error ? (
    <ErrorFetchingData />
  ) : (
    <div className="tasklist container">
      <div className="tasklist-title">
        <h1 className="title">Task Lists</h1>
        <button
          className="addtask-btn btn"
          onClick={() => {
            navigate("/addtask");
          }}
        >
          Add New Task
        </button>
      </div>
      <TaskList />
    </div>
  );
};

export default TaskHome;
