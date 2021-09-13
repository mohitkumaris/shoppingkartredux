import React from "react";
import { CartItemType } from "../interface/CartItemType";

type Props = {
  products: CartItemType[];
  handleAddItemToCart: (clickedItem: CartItemType) => void;
};
const GridComponent: React.FC<Props> = ({ products, handleAddItemToCart }) => {
  // As React cannot render as array so create a function then put in empty or
  // React.Fragment
  const showProducts = products.map((product: CartItemType) => {
    return (
      <div className="card" style={{ width: "18rem" }} key={product.id}>
        <img src={product.image} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <button
            className="btn btn-primary"
            onClick={() => handleAddItemToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  });
  return <React.Fragment>{showProducts}</React.Fragment>;
};

export default GridComponent;
