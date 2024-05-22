import { createSlice } from "@reduxjs/toolkit";
import { DanhSachGhe } from "../../types/movie.type";

const initialState: {listSeat: DanhSachGhe[]} = {
    listSeat: [],
};
const bookSeat = createSlice({
  name: "seat",
  initialState,
  reducers: {
    setBookingSeat: (state, { payload }) => {
      const clone:DanhSachGhe[] = [...state.listSeat];
      const index = clone.findIndex((item) => item.maGhe === payload.maGhe);
      if(index === -1){
        clone.push(payload);
        state.listSeat = clone;
      }
      else{
        clone.splice(index, 1)
        state.listSeat = clone;
      }
      
    },
    deleteBookingSeat: (state) => {
      state.listSeat = [];
    },
  },
});
export const { setBookingSeat, deleteBookingSeat } = bookSeat.actions;
export default bookSeat;