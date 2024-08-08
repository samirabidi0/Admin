import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  news: [],
};

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {},
});

export const {} = marketplaceSlice.actions;
export default marketplaceSlice.reducer;
