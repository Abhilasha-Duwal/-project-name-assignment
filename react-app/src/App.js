import "./App.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewTask from "./Pages/AddNewTask";
import TaskHome from "./Pages/TaskHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<TaskHome />} />
          <Route path="/addtask" exact element={<AddNewTask />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
