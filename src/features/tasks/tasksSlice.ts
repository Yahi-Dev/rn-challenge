import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type Task = { id: string; description: string };
type TasksState = { items: Task[] };

const initialState: TasksState = { items: [] };

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.items.unshift(action.payload);
      },
      prepare(description: string) {
        return { payload: { id: nanoid(), description: description.trim() } };
      }
    }
  }
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
