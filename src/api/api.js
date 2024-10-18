import { createAsyncThunk } from '@reduxjs/toolkit';
const baseUrl = 'https://aviasales-test-api.kata.academy';
export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async () => {
  const response = await fetch(`${baseUrl}/search`);
  const data = await response.json();
  return data.searchId;
});

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId, { dispatch, rejectWithValue }) => {
    if (!searchId) {
      return;
    }

    const fetchWithRetry = async (searchId) => {
      try {
        const response = await fetch(`${baseUrl}/tickets?searchId=${searchId}`);

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();
        if (data.tickets.length === 0) return;
        dispatch({ type: 'tickets/fetchTicketsSuccess', payload: data });
        if (!data.stop) {
          dispatch(fetchTickets(searchId));
        }
      } catch (error) {
        if (error.message === '500') {
          return fetchWithRetry(searchId);
        }
        return rejectWithValue(error.message);
      }
    };

    return await fetchWithRetry(searchId);
  }
);

export const fetchSearchIdAndTickets = () => async (dispatch) => {
  const { payload: searchId } = await dispatch(fetchSearchId());
  if (searchId) {
    dispatch(fetchTickets(searchId));
  }
};
