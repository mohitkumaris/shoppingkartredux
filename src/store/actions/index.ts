import cart from "../../apis/cart";
import { CartItemType } from "../../interface/CartItemType";
import * as actions from "../actionTypes";

export const getProducts = () => async (dispatch: any) => {
  const response = await cart.get<CartItemType[]>("products");
  dispatch({ type: actions.GET_PRODUCTS, payload: response.data });
};

export const addCart = (item: CartItemType) => {
  return { type: actions.ADD_CART, payload: item };
};
export const getCart = () => {
  return { type: actions.ADD_CART_SUCCESS };
};
export const removeCart = (item: CartItemType) => {
  return { type: actions.REMOVE_CART, payload: item };
};
