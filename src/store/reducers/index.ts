import { combineReducers } from "redux";
import productReducers from "./productsReducer";

export default combineReducers({
  products: productReducers,
});
