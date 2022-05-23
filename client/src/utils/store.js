import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categoriesSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        // define top-level state field named products
        products: productReducer,
        categories: categoryReducer,
        cart: cartReducer,
    }
});

export default store;