import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskItem from "./TaskItem";
import PriorityQueue from "./priorityQueue";
import { Task } from "../types/Task";

const priorityToValue = (priority: string) => {
  const priorityOrder: Record<string, number> = {
    Low: 1,
    Medium: 2,
    High: 3,
  };
  return priorityOrder[priority] || 0;
};

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filterOption = useSelector(
    (state: RootState) => state.tasks.filterOption
  );
  const searchQuery = useSelector(
    (state: RootState) => state.tasks.searchQuery
  );

  const getFilteredTasks = () => {
    const pq = new PriorityQueue<Task>();

    const searchedTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    searchedTasks.forEach((task) => {
      let sortValue = 0;

      switch (filterOption) {
        case "duedate":
          sortValue = new Date(task.dueDate).getTime(); // Sort by due date
          break;
        case "priority-asc": 
          sortValue = priorityToValue(task.priority);
          break;
        case "priority-desc": 
          sortValue = -priorityToValue(task.priority); 
          break;
        default:
          sortValue = 0; 
      }
      pq.enqueue(task, sortValue); 
    });

    const sortedTasks: Task[] = [];
    while (pq.size() > 0) {
      sortedTasks.push(pq.dequeue()!);
    }

    return sortedTasks;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="space-y-[4%] items-center justify-center px-[10%] mt-[2%]">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      ) : (
        <div className="text-center text-xl text-gray-500 mt-6">
          No tasks available, click on <span className="text-blue-500">Add Tasks</span>
        </div>
      )}
    </div>
  );
};

export default TaskList;
