import { AddNotification, RemoveNotification } from './notification.types';

const initialState: any = [];

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case AddNotification:
      return state.concat(payload);
    case RemoveNotification:
      return state.map((n: any) => {
        return { ...n, read: n.id == payload ? true : n.read };
      });
    default:
      return state;
  }
};
