import { createSlice } from '@reduxjs/toolkit';

export interface IsLoadingState {
  main: boolean;
  details: boolean;
}

const initialState: IsLoadingState = {
  main: true,
  details: false,
};

const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
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
