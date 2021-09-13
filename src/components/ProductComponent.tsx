import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { CartItemType } from "../interface/CartItemType";
import { State } from "../interface/StateType";
import { getProducts, addCart } from "../store/actions";
import GridComponent from "./GridComponent";

type Props = {
  getProducts(): void;
};

const ProductComponent = (props: Props) => {
  const products = useSelector((state: State) => state.products);
  const dispatch = useDispatch();
  const handleAddItemToCart = (item: CartItemType) => {
    dispatch(addCart(item));
  };
  const renderProducts = () => {
    if (!products) return null;
    // Need to write loading component
    return (
      <GridComponent
        products={products}
        handleAddItemToCart={handleAddItemToCart}
      />
    );
  };

  useEffect(() => {
    props.getProducts();
  }, [props]);

  return <React.Fragment>{renderProducts()}</React.Fragment>;
};
//**To Dispatch actions */
// const mapDispatchToProps = (dispatch:any)=> {
//   return {
//     addCart: (item:CartItemType)=> {dispatch(addCart(item))},
//     getProducts:()=>{dispatch(getProducts())}
//   }
// }

export default connect(null, { getProducts, addCart })(ProductComponent);
