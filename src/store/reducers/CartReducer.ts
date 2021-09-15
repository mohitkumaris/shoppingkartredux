import * as actions from "../actionTypes";
import { CartItemType } from "../../interface/CartItemType";

const INITIAL_STATE: CartItemType[] = [];

const cartReducers = (
  state = INITIAL_STATE,
  action: { type: string; payload: CartItemType }
) => {
  switch (action.type) {
    case actions.ADD_CART:
      // 1. Is the item already added in the cart?
      const isItemInCart = state.find((item) => item.id === action.payload.id);
      if (isItemInCart) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...state, { ...action.payload, amount: 1 }];
    case actions.ADD_CART_SUCCESS:
    case actions.REMOVE_CART_SUCCESS:
      return state;
    case actions.REMOVE_CART:
      return state.reduce((ack, item) => {
        if (item.id === action.payload.id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[]);

    default:
      return state;
  }
};

export default cartReducers;
