import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../interfaces/contexts';

export interface DispatchData {
  payload: Data;
  type: 'data/setDataValue';
}

export interface DataState {
  value: Data;
}

const initialState: DataState = {
  value: { items: undefined, page: 1, limit: 3, total: 0 },
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDataValue: (state, action): void => {
      state.value = action.payload;
    },
  },
});

export const { setDataValue } = dataSlice.actions;
export default dataSlice.reducer;
