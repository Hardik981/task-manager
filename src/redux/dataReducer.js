import { createSlice } from '@reduxjs/toolkit'

export const dataReducer = createSlice({
  name: 'changeData',
  initialState: {
    data: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.data = [...state.data, { name: action.payload.name, id: action.payload.id, tasks: [] },]
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter(user => user.id !== action.payload)
    },
    addTask: (state,action) => {
      let temp = [...state.data];
      let dueDate = action.payload.dueDate === null ? 'Not Set' : action.payload.dueDate;
      temp[action.payload.userIndex].tasks.push({ taskName: action.payload.taskName, status: action.payload.status, dueDate: dueDate, id: action.payload.id })
      state.data = [...temp];
    },
    changeTask: (state,action) => {
      let temp = [...state.data];
      temp[action.payload.userIndex].tasks[action.payload.index].taskName = action.payload.value;
      state.data = temp;
    },
    deleteTask: (state,action) => {
      let temp = [...state.data];
      temp[action.payload.userIndex].tasks = temp[action.payload.userIndex].tasks.filter(task=> task.id !== action.payload.id);
      state.data = temp;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, addTask, changeTask, deleteTask } = dataReducer.actions

export default dataReducer.reducer