/* eslint-disable indent */
import { useRef } from 'react';
import { updateCoinPrice, updateSelectedCoinPrice } from 'store/coins/actions';
import { useAppDispatch } from './useAppDispatch';

const baseWebsocketUrl = 'wss://ws.coincap.io';

export const useCoinCapWebSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const selectedSubscribeType = useRef<'all' | 'coin' | 'coins' | null>(null);
  const url = `${baseWebsocketUrl}/prices?assets=`;
  const dispatch = useAppDispatch();

  const close = () => {
    if (socketRef.current) {
      socketRef.current?.close();
    }
  };

  const subscribeAllCoins = () => {
    close();
    selectedSubscribeType.current = 'all';
    socketRef.current = new WebSocket(`${url}ALL`);
    listenToChanges(socketRef.current);
  };

  const subscribeCoin = (coinId: string) => {
    close();

    selectedSubscribeType.current = 'coin';
    socketRef.current = new WebSocket(`${url}${coinId}`);
    listenToChanges(socketRef.current);
  };

  const subscribeCoins = (coinIds: string | string[]) => {
    close();

    selectedSubscribeType.current = 'coins';
    socketRef.current = new WebSocket(
      `${url}${typeof coinIds === 'object' ? coinIds.join(',') : coinIds}`,
    );
    listenToChanges(socketRef.current);
  };

  const listenToChanges = (socket: WebSocket) => {
    socket.onmessage = function (msg) {
      const coinData = Object.values(JSON.parse(msg.data) || {});
      switch (selectedSubscribeType.current) {
        case 'all':
        case 'coins':
          dispatch(updateCoinPrice(JSON.parse(msg.data)));
          break;
        case 'coin':
          if (coinData.length > 0) {
            dispatch(updateSelectedCoinPrice(coinData[0] as string));
          }
          break;
        default:
          break;
      }
    };
  };

  return {
    close,
    subscribeCoin,
    subscribeCoins,
    subscribeAllCoins,
  };
};
