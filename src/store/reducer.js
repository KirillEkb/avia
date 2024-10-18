import { createSlice } from '@reduxjs/toolkit';

import { fetchSearchId, fetchTickets } from '../api/api';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    tabs: '',
    filter: ['Без пересадок'],
    tickets: [],
    searchId: null,
    loading: false,
    error: null,
  },
  reducers: {
    changeTabs: (state, action) => {
      state.tabs = action.payload;
    },
    changeFilter: (state, action) => {
      switch (action.payload) {
        case 'Все':
          state.filter = state.filter.includes('Все')
            ? []
            : ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
          break;
        case 'Без пересадок':
        case '1 пересадка':
        case '2 пересадки':
        case '3 пересадки':
          state.filter = state.filter.includes(action.payload)
            ? state.filter.filter((item) => item !== action.payload && item !== 'Все')
            : state.filter.length === 3
              ? [...state.filter, action.payload, 'Все']
              : [...state.filter, action.payload];
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('tickets/fetchTicketsSuccess', (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.loading = false;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { changeTabs, changeFilter } = appSlice.actions;
export default appSlice.reducer;
