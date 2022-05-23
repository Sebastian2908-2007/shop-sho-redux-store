import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartOpen: false
    },
    reducers: {
       addTooCart(state,action) {
           const cartItem = action.payload;
           const cart = state.cart;
           state.cartOpen = true;
           cart.push(cartItem);

       }, 
       updateCartQuantity(state,action) {
          state.cartOpen = true;
          state.cart.map(product => {
              if(action.payload._id === product._id) {
                  product.purchaseQuantity = action.payload.purchaseQuantity;
              }
          });

       },
    }
});

// export action creators
export const {
    addTooCart,
    updateCartQuantity
} = cartSlice.actions;

//export reducer
export default cartSlice.reducer;