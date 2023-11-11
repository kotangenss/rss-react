import { createSlice } from '@reduxjs/toolkit';

export interface DispatchActiveItemId {
  payload: undefined | number;
  type: 'activeItemId/setActiveItemIdValue';
}

const activeItemIdSlice = createSlice({
  name: 'activeItemId',
  initialState: {
    value: undefined,
  },
  reducers: {
    setActiveItemIdValue: (state, action): void => {
      state.value = action.payload;
    },
  },
});

export const { setActiveItemIdValue } = activeItemIdSlice.actions;
export default activeItemIdSlice.reducer;
