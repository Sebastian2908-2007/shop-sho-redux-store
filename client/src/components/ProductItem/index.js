import React from "react";
import { Link } from "react-router-dom";
import { pluralize, idbPromise} from "../../utils/helpers";
//import { useStoreContext } from '../../utils/GlobalState';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
//import { ADD_TO_CART, ADD_MULTIPLE_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { addTooCart, updateCartQuantity } from "../../utils/cartSlice";


function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  //const [state, dispatch] = useStoreContext(); 
  const dispatch = useDispatch();

  const { cart }= useSelector(state => state.cart);
  const state = useSelector(state => state);
console.log(state);
 // const { cart } = state;

  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    if(itemInCart) { 
      dispatch(updateCartQuantity({ 
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      }));
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
  } 
  else {
     dispatch(addTooCart({ ...item, purchaseQuantity: 1 }));
     

    idbPromise('cart', 'put', {...item, purchaseQuantity: 1});
  }
  };     
  

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}/`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
