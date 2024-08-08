import axios from "@/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Tool {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface MarketState {
  marketList: Tool[];
  loading: boolean;
  error: string | null;
}

const initialState: MarketState = {
  marketList: [],
  loading: false,
  error: null,
};

// Async thunks
export const addTool = createAsyncThunk(
  "market/addTool",
  async (tool: Omit<Tool, "id">, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/tools/add", tool);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchTools = createAsyncThunk(
  "market/fetchTools",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/tools/all");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteTool = createAsyncThunk(
  "market/deleteTool",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/tools/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const marketplaceSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTool.fulfilled, (state, action) => {
        state.loading = false;
        state.marketList.push(action.payload);
      })
      .addCase(addTool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.loading = false;
        state.marketList = action.payload;
      })
      .addCase(fetchTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTool.fulfilled, (state, action) => {
        state.loading = false;
        state.marketList = state.marketList.filter(
          (tool) => tool.id !== action.payload,
        );
      })
      .addCase(deleteTool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default marketplaceSlice.reducer;
