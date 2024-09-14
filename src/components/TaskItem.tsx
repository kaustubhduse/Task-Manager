import React, { useEffect, useRef } from "react";
import { Button } from "antd";
import { Task } from "../types/Task";
import { useAppDispatch } from "../redux/store";
import { deleteTask } from "../redux/tasksSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import { gsap } from "gsap"; 

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null); // Ref for the task card

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }
  }, []);

  const handleEdit = () => {
    navigate(`/edit-task/${task.id}`);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "Low":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "High":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <motion.div
      ref={cardRef} // Attach ref to the card div for GSAP animations
      className="relative flex flex-col md:flex-row items-start p-4 border rounded-md shadow-sm bg-white max-w-[1000px] mx-auto space-y-4 md:space-y-0"
      whileHover={{ scale: 1.05 }} // Framer hover effect
      whileTap={{ scale: 0.98 }} // Framer tap effect
    >
      {/* Stack title, dueDate, and status vertically and align to the left */}
      <div className="flex flex-col items-start space-y-2">
        <span className="font-semibold text-left text-xs md:text-base">
          Task Title:
        </span>
        <span
          className="text-lg block w-full"
          style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
        >
          {task.title}
        </span>

        <span className="text-left text-sm md:text-base">
          Due Date: <span className="text-lg">{task.dueDate}</span>
        </span>

        <span className="text-left text-sm md:text-base flex items-center">
          Status: 
          <span className="text-lg ml-2">{task.status}</span>
          {/* Conditionally render green blinking light if status is "In Progress" */}
          {task.status === "In Progress" && (
            <div className="w-4 h-4 bg-green-500 rounded-full ml-2 animate-blink"></div>
          )}
        </span>

        {/* Display the priority with colored text */}
        <span className="text-left text-sm md:text-base">
          Priority:{" "}
          <span className={`text-lg ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </span>
      </div>

      {/* Buttons with Framer Motion animations */}
      <div className="flex flex-row md:flex-row space-x-2 mt-4 md:mt-0">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button type="primary" onClick={handleEdit} className="md:px-5 md:py-5 px-3 py-3">
            <span className="text-xl">Edit</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button danger onClick={() => dispatch(deleteTask(task.id))} className="md:px-5 md:py-5 px-3 py-3">
            <span className="text-xl">Delete</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
