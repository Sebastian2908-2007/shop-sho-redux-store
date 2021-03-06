import React from "react";
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from "react-redux";
//import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { removeFromCartt, updateCartQuantity } from "../../utils/cartSlice";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

//const [, dispatch] = useStoreContext();
const dispatch = useDispatch();

    const removeFromCart = async () => {
        dispatch(removeFromCartt(item._id));
        idbPromise('cart', 'delete', {...item});
      };

      const onChange = (e) => {
          const value = e.target.value;

          if (value === '0' ) {
            dispatch(removeFromCartt(item._id));
              idbPromise('cart', 'delete',{...item})
          }else {
              dispatch(updateCartQuantity({
                  _id: item._id,
                  purchaseQuantity: parseInt(value)
              }));
              idbPromise('cart', 'put', {...item, purchaseQuantity: parseInt(value) });
          }
      };

    //console.log(item);
  return (
      <div className="flex-row">
          <div>
              <img
              src={`/images/${item.image}`}
              alt=''
              />
          </div>
          <div>
              <div>{item.name}, ${item.price}</div>
              <div>
          <span>Qty:</span>
          <input 
          type="number"
          placeholder="1"
          value={item.purchaseQuantity}
          onChange={onChange}
          />
                
          <span
          role="img"
          aria-label="trash"
          onClick={removeFromCart}
          >
              🗑️
          </span>
          </div>
        </div>
      </div>
  );
};

export default CartItem;