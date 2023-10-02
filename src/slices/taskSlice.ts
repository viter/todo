import { createSlice } from '@reduxjs/toolkit';

import { Task } from '../lib/types';

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.done = !task.done;
        }
        return task;
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    loadTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, loadTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
