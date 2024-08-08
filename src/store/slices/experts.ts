import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  experts: [],
};

const expertsSlice = createSlice({
  name: "experts",
  initialState,
  reducers: {},
});

export const {} = expertsSlice.actions;
export default expertsSlice.reducer;
