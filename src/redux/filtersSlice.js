import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    name: '',
  },
  selectors: {
    selectNameFilter(state) {
      return state.name;
    },
  },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;

export const filtersReducer = filterSlice.reducer;

export const { selectNameFilter } = filterSlice.selectors;
