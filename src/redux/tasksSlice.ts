import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/Task";
import { v4 as uuidv4 } from "uuid";

interface TasksState {
  tasks: Task[];
  filterOption: "duedate" | "priority-asc" | "priority-desc" | undefined;
  searchQuery: string; 
}

const initialState: TasksState = {
  tasks: [],
  filterOption: undefined,
  searchQuery: "", 
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      state.tasks.push({ ...action.payload, id: uuidv4() });
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilterOption: (
      state,
      action: PayloadAction<"duedate" | "priority-asc" | "priority-desc" | undefined>
    ) => {
      state.filterOption = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setFilterOption, setSearchQuery } =
  tasksSlice.actions;
export default tasksSlice.reducer;
