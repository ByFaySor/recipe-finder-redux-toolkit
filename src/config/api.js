import axios from 'axios';

const apiKey = `0a868feff2b44df28a3c67eb9d20c1dc`
const parameterApiKey = `?apiKey=${apiKey}&`

const API = {}

const baseURL = process.env.REACT_APP_API_URL || `https://api.spoonacular.com/recipes/`

const axiosInstance = axios.create({
  baseURL,
  validateStatus() {
    return true
  },
})

// Endpoint
const axiosRun = (endpoint, parameters) => {
  return axiosInstance.get(`${endpoint}${parameterApiKey}${parameters}`)
}
// Recetas
API.getRandomRecipes = (limit) => axiosRun(`random`, `number=${limit}`)
API.getRecipes = ({ query, limit, filter }) => axiosRun(`complexSearch`, `query=${query}&number=${limit}${filter}`)

export default API
