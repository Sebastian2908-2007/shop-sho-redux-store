import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categoriesSlice";

const store = configureStore({
    reducer: {
        // define top-level state field named products
        products: productReducer,
        categories: categoryReducer
    }
});

export default store;