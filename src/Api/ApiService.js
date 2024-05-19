import axios from 'axios';

const BASIC_URL = 'https://663b7542fee6744a6ea1b6e9.mockapi.io';

async function getAdverts() {
  const response = await axios.get(`${BASIC_URL}/adverts`);
  const adverts = await response.data;
  return await adverts;
}

export default getAdverts;
