import { createSlice } from '@reduxjs/toolkit';
import API from './../../config/api';

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    value: ``,
    recipes: [],
    searchRecipes: [],
    filterButtonValue: `All`,
    errors: [],
  },
  reducers: {
    setRecipe: (state, value) => {
      state.value = value;
    },
    setRecipes: (state, data) => {
      state.searchRecipes = data;
    },
    setFilterButtonValue: (state, value) => {
      state.filterButtonValue = value;
    },
  },
});

export const {
  setRecipe,
  setRecipes,
  setFilterButtonValue,
} = recipeSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getRecipes = amount => async (dispatch, getState) => {
  const filterButtonValue = (getState().recipe.filterButtonValue.payload || `All`).toLocaleLowerCase()
  let filter = ``

  switch (filterButtonValue) {
    case `vegan`:
      filter = `&diet=${filterButtonValue}`
    break
    case `italian`:
    case `chinese`:
    case `french`:
      filter = `&cuisine=${filterButtonValue}`
    break
    case `main course`:
    case `dessert`:
    case `salad`:
      filter = `&type=${filterButtonValue}`
    break
    default:
      filter = ``
  }

  try {
    const response = await API.getRecipes({
      query: getState().recipe.value.payload,
      limit: 10,
      filter,
    });
    dispatch(setRecipes(response.data.results));
  } catch (e) {
    const error =
      typeof e === `string` ? e : `Hubo un error inesperado, reintenta.`;
    console.log(error);
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.recipe.value)`
export const selectRecipe = state => state.recipe.value.payload || ``;
export const selectRecipes = state => state.recipe.recipes.payload || [];
export const selectSearchRecipes = state => state.recipe.searchRecipes.payload || [];

export default recipeSlice.reducer;
