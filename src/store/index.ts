import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import experts from "./slices/experts";
import market from "./slices/marketplace";
import news from "./slices/news";
export const makeStore = () => {
  return configureStore({
    reducer: {
      user,
      experts,
      market,
      news,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
