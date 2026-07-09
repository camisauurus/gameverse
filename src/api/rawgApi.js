const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY || '';

async function fetchFromApi(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('key', API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function getGames({
  page = 1,
  pageSize = 20,
  search = '',
  genres = '',
  platforms = '',
  ordering = '-metacritic',
} = {}) {
  const params = {
    page,
    page_size: pageSize,
    search: search || undefined,
    genres: genres || undefined,
    platforms: platforms || undefined,
    ordering,
  };

  return fetchFromApi('/games', params);
}

export async function getGameDetails(id) {
  return fetchFromApi(`/games/${id}`);
}

export async function getGameScreenshots(id) {
  return fetchFromApi(`/games/${id}/screenshots`);
}

export async function getGenres() {
  return fetchFromApi('/genres');
}

export async function getPlatforms() {
  return fetchFromApi('/platforms/lists/parents');
}

export async function getGameSeries(id) {
  return fetchFromApi(`/games/${id}/game-series`);
}
