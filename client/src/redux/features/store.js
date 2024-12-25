import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";
import eventSlice from "./eventSlice";

const store = configureStore({
  reducer: {
    alerts: alertSlice,
    events: eventSlice,
  },
});

export default store;
