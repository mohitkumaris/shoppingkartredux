import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getProducts } from "../store/actions";

import GridComponent from "./GridComponent";

const ProductComponent = (props: any) => {
  const products = useSelector((state: any) => state.products);
  const renderProducts = () => {
    if (!products) return null;
    // Need to write loading component
    return <GridComponent products={products} />;
  };

  useEffect(() => {
    props.getProducts();
  }, [props]);

  return <React.Fragment>{renderProducts()}</React.Fragment>;
};

export default connect(null, { getProducts })(ProductComponent);
