// import create slice and createSelector from redux toolkit
import { createSlice, createSelector } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState:{
        products: [],
    },
    reducers: {
        updateProducts(state, action) {
            const products = action.payload;
            state.products = products;
        }
    }


});

// export our action
export const {
updateProducts
} = productSlice.actions;

export default productSlice.reducer;


