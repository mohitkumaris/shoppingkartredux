import cart from "../../apis/cart";
import { CartItemType } from "../../types/CartItemType";
import * as actions from "../actionTypes";

export const getProducts = async (dispatch: any) => {
  const response = await cart.get<CartItemType[]>("products");
  dispatch({ type: actions.GET_PRODUCTS, payload: response.data });
};
