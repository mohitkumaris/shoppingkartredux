import { combineReducers } from "redux";
import cartReducers from "./CartReducer";
import productReducers from "./productsReducer";

export default combineReducers({
  products: productReducers,
  cart: cartReducers,
});
