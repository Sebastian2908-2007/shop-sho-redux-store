import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: 'categories',
   initialState: { 
    categories: [],
    currentCategory: '',
   },
    reducers: {
        updateCategories(state, action) {
            const categiories = action.payload;
            state.categories = categiories;
        },
        updateCurrentCategory(state, action) {
            const currentCategory = action.payload;
            state.currentCategory = currentCategory;
        }
    }
});

// export and destructure all of our redux actions
export const {
    updateCategories,
    updateCurrentCategory
} = categoriesSlice.actions;

 // export our reducer as a whole
 export default categoriesSlice.reducer