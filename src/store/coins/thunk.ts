import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserList = createAsyncThunk(
  'coins/FETCH_COINS',
  async () => await Promise.resolve('Coins value'),
);
