import React from "react";
import "./TaskList.css";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../Redux/api/ApiSlice";
import { toast } from "react-toastify";

const TaskList = () => {
  const { data: tasks} = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  console.log("data", tasks);

  const updateCompleteTask = (task) => {
    try {
      updateTask({ ...task, completed: !task.completed });
      toast.success("Successfully updated the completed status.");
    } catch (error) {
      toast.error("fail to update completed status.");
    }
  };

  const onDeleteTask = (id) => {
    // Display confirmation dialog before deleting task
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return; // If user cancels deletion, exit function;
    
    try {
      deleteTask({ id: id });
      toast.success("Successfully deleted task.");
    } catch (error) {
      toast.error("fail to delete task.");
    }
  };

  return(
    <table>
      <thead>
        <tr>
          <th>S.N</th>
          <th>Title</th>
          <th>Status</th>
          <th>Remove Task</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task) => {
          return (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  id={task.id}
                  onChange={() => updateCompleteTask(task)}
                />
                <label htmlFor={task.id}>Completed</label>
              </td>
              <td>
                <button
                  className="delete-btn btn"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TaskList;
