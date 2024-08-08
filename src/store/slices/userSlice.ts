import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/axiosInstance";
import Cookies from "js-cookie";

interface UserState {
  userInfo: {
    id?: string;
    FirstName?: string;
    LastName?: string;
  };
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  userInfo: {},
  token: null,
  status: "idle",
  error: null,
};

interface SigninResponse {
  loggedUser: {
    id: string;
    FirstName: string;
    LastName: string;
  };
  token: string;
  message: string;
}

interface SigninRequest {
  email: string;
  password: string;
  router: any;
}

export const signin = createAsyncThunk<SigninResponse, SigninRequest>(
  "user/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<SigninResponse>(
        "/api/expert/signin",
        credentials,
      );
      credentials.router.push("/");
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: "Network error" });
      }
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        signin.fulfilled,
        (state, action: PayloadAction<SigninResponse>) => {
          state.status = "succeeded";
          state.userInfo = action.payload.loggedUser;
          state.token = action.payload.token;
          state.error = null;
          // Save token in cookies
          Cookies.set("authToken", action.payload.token, { expires: 7 });
        },
      )
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to sign in";
      });
  },
});

export default userSlice.reducer;
