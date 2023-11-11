import { createSlice } from '@reduxjs/toolkit';

const isLoadingMainSlice = createSlice({
  name: 'isLoading',
  initialState: {
    value: false,
  },
  reducers: {
    setIsLoadingValue: (state, action): void => {
      state.value = action.payload;
    },
  },
});

export const { setIsLoadingValue } = isLoadingMainSlice.actions;
export default isLoadingMainSlice.reducer;
