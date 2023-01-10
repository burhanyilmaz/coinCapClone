import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

export const getFormattedCurrencyValue = (price: number | string) =>
  new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 5,
    style: 'currency',
    currency: 'usd',
  }).format(Number(price));

export const getFormattedPercentageValue = (dailyPercentage: number | string) =>
  new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(Number(dailyPercentage));
