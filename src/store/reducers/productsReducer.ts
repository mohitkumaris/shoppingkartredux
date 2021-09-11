import * as actions from "../actionTypes";
import { CartItemType } from "../../types/CartItemType";

const INITIAL_STATE: CartItemType[] = [];

const productReducers = (
  state = INITIAL_STATE,
  action: { type: string; payload: CartItemType[] }
) => {
  switch (action.type) {
    case actions.GET_PRODUCTS:
      return [...action.payload];

    default:
      return state;
  }
};

export default productReducers;
