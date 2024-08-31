import { createSlice, createSelector } from '@reduxjs/toolkit';

import { fetchContacts, addContact, deleteContact } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  selectors: {
    selectContacts(state) {
      return state.items;
    },
    selectLoading(state) {
      return state.loading;
    },
    selectError(state) {
      return state.error;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state, action) => {
        state.items.push({ id: null, ...action.meta.arg });
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        const newItemIndex = state.items.findIndex(
          item => item.name === action.payload.name && item.number === action.payload.number,
        );
        state.items[newItemIndex] = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        const newItemIndex = state.items.findIndex(
          item => item.name === action.meta.arg.name && item.number === action.meta.arg.number,
        );
        state.items.splice(newItemIndex, 1);
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state, action) => {
        const index = state.items.findIndex(contact => contact.id === action.meta.arg.id);
        state.items[index] = { ...state.items[index], id: null };
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          item =>
            item.name === action.payload.name &&
            item.number === action.payload.number &&
            item.id === null,
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        const index = state.items.findIndex(
          item =>
            item.name === action.meta.arg.name &&
            item.number === action.meta.arg.number &&
            item.id === null,
        );
        state.items[index] = { ...state.items[index], id: action.meta.arg.id };
        state.error = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { selectContacts, selectLoading, selectError } = contactsSlice.selectors;

export const selectFilteredContacts = createSelector(
  selectContacts,
  selectNameFilter,
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  },
);
