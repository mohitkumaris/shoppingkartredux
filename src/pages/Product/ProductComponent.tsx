import { useState, useEffect, useReducer } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
// Components
import Item from "../../components/Item/Item";
import Cart from "../../components/Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
// Styles
import { Wrapper, StyledButton } from "./Product.styles";
// Types
import { CartItemType } from "@interface/CartItemType";
import { State } from "@interface/StateType";
import {
  addCart,
  addCartSuccess,
  removeCart,
  getProducts,
  removeCartSucess,
} from "../../store/actions";
import Box from "@material-ui/core/Box";

type Action = {
  type: string;
};
type ProductState = {
  cartOpenClose: boolean;
};

const productReducer = (state: ProductState, action: Action) => {
  switch (action.type) {
    case "openCart":
      return { ...state, cartOpenClose: true };
    case "closeCart":
      return { ...state, cartOpenClose: false };
    default:
      return state;
  }
};

const initialState: ProductState = {
  cartOpenClose: false,
};

const ProductComponent = () => {
  // const [cartOpen, setCartOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [search, setSearch] = useState("");
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { cartOpenClose } = state;
  const products = useSelector((state: State) => state.products);
  const cartItems = useSelector((state: State) => state.cart);
  const dispatchActions = useDispatch();
  const handleAddItemToCart = (item: CartItemType) => {
    dispatchActions(addCart(item));
    dispatchActions(addCartSuccess());
  };
  const handleRemoveCart = (item: CartItemType) => {
    dispatchActions(removeCart(item));
    dispatchActions(removeCartSucess());
  };
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  const searchFn = useDebounce((text: string) => setSearch(text), 1000);

  const handleSearch = (e: any) => {
    const searchValue = e.target.value;
    setTextValue(searchValue);
    searchFn(e.target.value);
  };

  useEffect(() => {
    dispatchActions(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!products.length)
    return (
      <div>
        <LinearProgress />
      </div>
    );
  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={cartOpenClose}
        onClose={() => dispatch({ type: "closeCart" })}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddItemToCart}
          removeFromCart={handleRemoveCart}
        />
      </Drawer>
      <StyledButton onClick={() => dispatch({ type: "openCart" })}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Box
        sx={{
          width: 1000,
          maxWidth: "100%",
        }}>
        <TextField
          fullWidth
          value={textValue}
          onChange={(e) => handleSearch(e)}
          variant="outlined"
        />
      </Box>
      Search Text: <label> {search} </label>
      <Grid container spacing={3}>
        {products?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddItemToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ProductComponent;
