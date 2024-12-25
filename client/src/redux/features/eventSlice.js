import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload; // Sets the events in the store
    },
  },
});

export const { setEvents } = eventSlice.actions;
export default eventSlice.reducer;
