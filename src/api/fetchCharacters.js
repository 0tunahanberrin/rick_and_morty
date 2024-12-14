import axios from 'axios';

// Asynchronously fetches character data from the API.
// Takes an optional page number parameter, default is 1.
const fetchCharacters = async (page, pageSize) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};


export default fetchCharacters;
