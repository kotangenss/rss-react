import { createSlice } from '@reduxjs/toolkit';

const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: {
    main: false,
    details: false,
  },
  reducers: {
    setIsLoadingMainValue: (state, action) => {
      state.main = action.payload;
    },
    setIsLoadingDetailsValue: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setIsLoadingMainValue, setIsLoadingDetailsValue } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
