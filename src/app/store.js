import { configureStore } from '@reduxjs/toolkit'
import alertReducer from "../app/features/alert/alertChange";

export default configureStore({
  reducer: {
    alert: alertReducer
  }
})
