import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

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
       toggleCartt(state, action) {
        state.cartOpen = action.payload;
       },
       addMultipleToCart(state,action) {
           const itemsToAdd = action.payload;
           const cart = state.cart;
           itemsToAdd.forEach(item => cart.push(item));
       },
       removeFromCartt(state,action) {
            const updatedCart = state.cart.filter(product => {
                return product._id !== action.payload;
            });
            state.cartOpen = updatedCart.length > 0;
            state.cart = updatedCart;
       },
       
    }
});

// export action creators
export const {
    addTooCart,
    updateCartQuantity,
    toggleCartt,
    addMultipleToCart,
    removeFromCartt
} = cartSlice.actions;

//export reducer
export default cartSlice.reducer;