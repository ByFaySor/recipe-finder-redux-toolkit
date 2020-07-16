import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../features/recipe/recipeSlice';

export default configureStore({
  reducer: {
    recipe: recipeReducer,
  },
});
