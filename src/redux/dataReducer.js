import { createSlice } from '@reduxjs/toolkit'

export const dataReducer = createSlice({
  name: 'changeData',
  initialState: {
    data: [],
  },
  reducers: {
    addData: (state,action) => {
      state.data = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addData } = dataReducer.actions

export default dataReducer.reducer