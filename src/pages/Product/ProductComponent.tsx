import { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
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

type Props = {
  getProducts(): void;
};

const ProductComponent = (props: Props) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [search, setSearch] = useState("");
  const products = useSelector((state: State) => state.products);
  const cartItems = useSelector((state: State) => state.cart);
  const dispatch = useDispatch();
  const handleAddItemToCart = (item: CartItemType) => {
    dispatch(addCart(item));
    dispatch(addCartSuccess());
  };
  const handleRemoveCart = (item: CartItemType) => {
    dispatch(removeCart(item));
    dispatch(removeCartSucess());
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
    props.getProducts();
  }, [props]);
  if (!products.length)
    return (
      <div>
        <LinearProgress />
      </div>
    );
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddItemToCart}
          removeFromCart={handleRemoveCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Box
        sx={{
          width: 1000,
          maxWidth: "100%",
        }}
      >
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

export default connect(null, {
  getProducts,
  addCartSuccess,
  addCart,
  removeCart,
  removeCartSucess,
})(ProductComponent);
