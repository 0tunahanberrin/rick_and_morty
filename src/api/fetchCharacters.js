import axios from 'axios';

// Asynchronously fetches character data from the API.
// Takes an optional page number parameter, default is 1.
const fetchCharacters = async (page = 1) => {
  // Fetches character data from the API with the specified page number.
  const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
  // Returns the data part of the API response.
  return response.data;
};

export default fetchCharacters;
