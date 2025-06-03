// features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API call using createAsyncThunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', // action type
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data; // the returned value is the payload of the fulfilled action
  }
);

// Create slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // When the fetchUsers action is pending (loading)
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When the fetchUsers action is fulfilled (successful)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      // When the fetchUsers action is rejected (failed)
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Export the reducer to configure in store
export default userSlice.reducer;
