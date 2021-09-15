import { CartItemType } from "../../interface/CartItemType";
import Button from "@material-ui/core/Button";
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
        <Button onClick={() => handleAddToCart(item)}>Add Item to Cart</Button>
      </div>
    </Wrapper>
  );
};

export default Item;
