import { createSlice } from '@reduxjs/toolkit';

export interface SearchState {
  value: string;
}

export interface DispatchSearch {
  payload: string;
  type: 'search/saveSearchValue';
}

const initialState: SearchState = {
  value: localStorage.getItem('searchQuery') || '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    saveSearchValue: (state, action): void => {
      state.value = action.payload;
    },
  },
});

export const { saveSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
