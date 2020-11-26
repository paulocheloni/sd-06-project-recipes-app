const baseAPIDrinks = ('https://www.thecocktaildb.com/api/json/v1/1/');
const endPointDrinkIngredient = ('filter.php?i=');
const endPointDrinkName = ('search.php?s=');
const endPointDrinkFirstLetter = ('search.php?f=');

const baseAPIMeal = ('https://www.themealdb.com/api/json/v1/1/');
const endPointMealIngredient = ('filter.php?i=');
const endPointMealName = ('search.php?s=');
const endPointMealFirstLetter = ('search.php?f=');
const endPointCategoryList = ('list.php?c=list');
const endPointCategory = ('filter.php?c=');

export const fetchDrinkAPIByIngredient = async (ingredient) => {
  const response = await fetch(`${baseAPIDrinks}${endPointDrinkIngredient}${ingredient}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchDrinkAPIByName = async (name) => {
  const response = await fetch(`${baseAPIDrinks}${endPointDrinkName}${name}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchDrinkAPIByFirstLetter = async (firstLetter) => {
  const response = await
  fetch(`${baseAPIDrinks}${endPointDrinkFirstLetter}${firstLetter}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchMealAPIByIngredient = async (ingredient) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealIngredient}${ingredient}`);
  const json = await response.json();
  return json.meals;
};

export const fetchMealByName = async (name) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealName}${name}`);
  const json = await response.json();
  return json.meals;
};

export const fetchMealByFirstLetter = async (firstLetter) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealFirstLetter}${firstLetter}`);
  const json = await response.json();
  return json.meals;
};

export const getDrinksStart = async (callback) => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  callback(json.drinks);
};

export const initialRecipes = async (callback) => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  callback(json.meals);
};

export const fetchMealCategoryList = async () => {
  const response = await fetch(`${baseAPIMeal}${endPointCategoryList}`);
  const json = await response.json();
  return json.meals;
};

export const fetchDrinkCategoryList = async () => {
  const response = await fetch(`${baseAPIDrinks}${endPointCategoryList}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchMealByCategory = async (category) => {
  const response = await fetch(`${baseAPIMeal}${endPointCategory}${category}`);
  const json = await response.json();
  return json.meals;
};

export const fetchDrinkByCategory = async (category) => {
  const response = await fetch(`${baseAPIDrinks}${endPointCategory}${category}`);
  const json = await response.json();
  return json.drinks;
};