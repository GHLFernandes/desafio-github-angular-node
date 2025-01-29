import axios from "axios";

const BASE_URL = "https://api.github.com";

const getUserRepos = async (username: string) => {
  const response = await axios.get(`${BASE_URL}/users/${username}/repos`);
  return response.data;
};

const searchRepos = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search/repositories`, {
    params: { q: query },
  });
  return response.data.items;
};

export { getUserRepos, searchRepos }