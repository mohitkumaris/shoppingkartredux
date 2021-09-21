import { combineReducers } from "redux";
import cartReducers from "./cartReducer";
import productReducers from "./productsReducer";

export default combineReducers({
  products: productReducers,
  cart: cartReducers,
});
