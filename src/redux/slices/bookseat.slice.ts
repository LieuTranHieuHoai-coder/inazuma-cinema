import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listSeat: [],
};
const bookSeat = createSlice({
  name: "seat",
  initialState,
  reducers: {
    setBookingSeat: (state, { payload }) => {
      state.listSeat = payload;
    },
  },
});
export const { setBookingSeat } = bookSeat.actions;
export default bookSeat;