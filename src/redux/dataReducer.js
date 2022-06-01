import { createSlice } from '@reduxjs/toolkit'

export const dataReducer = createSlice({
  name: 'changeData',
  initialState: {
    data: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.data = [...state.data, { name: action.payload, tasks: [] },]
    },
    deleteUser: (state, action) => {
      let temp = [...state.data];
      temp.splice(action.payload, 1);
      state.data = [...temp];
    },
    addTask: (state,action) => {
      let temp = [...state.data];
      const dateValue = action.payload.dueDate === '' ? "Not Set" : action.payload.dueDate;
      temp[action.payload.userIndex].tasks.push({ taskName: action.payload.taskName, status: action.payload.status, dueDate: dateValue })
      state.data = [...temp];
    },
    changeTask: (state,action) => {
      let temp = [...state.data];
      temp[action.payload.userIndex].tasks[action.payload.index].taskName = action.payload.value;
      state.data = temp;
    },
    deleteTask: (state,action) => {
      let temp = [...state.data];
      temp[action.payload.userIndex].tasks.splice(action.payload.index, 1);
      state.data = temp;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, addTask, changeTask, deleteTask
 } = dataReducer.actions

export default dataReducer.reducer