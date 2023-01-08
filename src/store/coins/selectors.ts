import { RootState } from 'store';

type coinsRootState = Pick<RootState, 'coins'>;

export const dummyDataSelector = (state: coinsRootState): string => state.coins.dummy;
