const BASE_URL = "https://xxvnapi.com/api";

export const API_ENDPOINTS = {
  MOVIE_DETAIL: (slug) => `${BASE_URL}/phim/${slug}`,
  LATEST_MOVIES: (page = 1) => `${BASE_URL}/phim-moi-cap-nhat?page=${page}`,
  LATESTs_MOVIES: () => `${BASE_URL}/phim-moi-cap-nhat`,

  CATEGORY_MOVIES: (category, page = 1) =>
    `${BASE_URL}/chuyen-muc/${category}?page=${page}`,
};
