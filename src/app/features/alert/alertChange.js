import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    message: null
  },
  reducers: {
    changeAlertStatus: (state, action) => {
      state.message = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeAlertStatus } = alertSlice.actions

export default alertSlice.reducer
