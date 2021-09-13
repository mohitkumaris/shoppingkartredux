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

    default:
      return state;
  }
};

export default cartReducers;
