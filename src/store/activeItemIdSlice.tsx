import { createSlice } from '@reduxjs/toolkit';

export interface DispatchActiveItemId {
  payload: number | undefined;
  type: 'activeItemId/setActiveItemIdValue';
}

export interface ActiveItemIdState {
  value: number | undefined;
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
