import { createSlice } from '@reduxjs/toolkit';

export interface DispatchActiveItemId {
  type: 'activeItemId/setActiveItemIdValue';
  payload?: number;
}

export interface ActiveItemIdState {
  value?: number;
}

const initialState: ActiveItemIdState = {
  value: undefined,
};

const activeItemIdSlice = createSlice({
  name: 'activeItemId',
  initialState,
  reducers: {
    setActiveItemIdValue: (state, action): void => {
      state.value = action.payload;
    },
  },
});

export const { setActiveItemIdValue } = activeItemIdSlice.actions;
export default activeItemIdSlice.reducer;
