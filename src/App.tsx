import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import EditForm from "./components/EditForm";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar>
          <div className="min-h-screen p-4 bg-custom-gradient">
            <h1 className="text-2xl font-bold text-center mb-4">
              Task Manager
            </h1>
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add-task" element={<TaskForm />} />
              <Route path="/edit-task/:id" element={<EditForm />} />
            </Routes>
          </div>
        </Navbar>
      </Router>
    </Provider>
  );
};

export default App;
