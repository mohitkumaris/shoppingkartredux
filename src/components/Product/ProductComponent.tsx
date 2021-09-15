import { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
// Components
import Item from "../Item/Item";
import Cart from "../Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import LinearProgress from "@material-ui/core/LinearProgress";
// Styles
import { Wrapper, StyledButton } from "./Product.styles";
// Types
import { CartItemType } from "../../interface/CartItemType";
import { State } from "../../interface/StateType";
import { addCart, getCart, removeCart, getProducts } from "../../store/actions";

type Props = {
  getProducts(): void;
};

const ProductComponent = (props: Props) => {
  const [cartOpen, setCartOpen] = useState(false);
  const products = useSelector((state: State) => state.products);
  const cartItems = useSelector((state: State) => state.cart);
  const dispatch = useDispatch();
  const handleAddItemToCart = (item: CartItemType) => {
    dispatch(addCart(item));
    dispatch(getCart());
  };
  const handleRemoveCart = (item: CartItemType) => {
    dispatch(removeCart(item));
    dispatch(getCart());
  };
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
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

export default connect(null, { getProducts, getCart, addCart, removeCart })(
  ProductComponent
);
