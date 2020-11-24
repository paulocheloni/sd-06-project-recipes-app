export default async function FetchApiBebidas(filtro, value) {
  if (filtro === '1') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.drinks;
  } if (filtro === '2') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.drinks;
  } if (filtro === '3') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.drinks;
  }
}