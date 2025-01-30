import axios from "axios";
import { config } from "../config/appConfig";

const getUserRepos = async (username: string) => {
  try {
    const response = await axios.get(`${config.githubBaseUrl}/users/${username}/repos`, {
      headers: {
        Authorization: `token ${config.githubAccessToken}`
      }
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao chamar API do GitHub:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao buscar repositórios do GitHub");
  }
};

const searchRepos = async (query: string) => {
  try {
    const response = await axios.get(`${config.githubBaseUrl}/search/repositories`, {
      params: { q: query },
      headers: {
        Authorization: `token ${config.githubAccessToken}`
      }
    });

    const repositories = response.data.items;

    const repositoriesWithContributors = await Promise.all(
      repositories.map(async (repo: any) => {
        try {
          const contributorsResponse = await axios.get(repo.contributors_url, {
            headers: {
              Authorization: `token ${config.githubAccessToken}`
            }
          });
        
          return {
            ...repo,
            contributors: contributorsResponse.data.map((contributor: any) => ({
              login: contributor.login,
            })),
          };
        } catch (error: unknown) {
          let errorMessage = "Erro desconhecido ao buscar contribuidores.";
          
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          
          console.error(`Erro ao buscar contribuidores para ${repo.name}:`, errorMessage);
          
          return { ...repo, contributors: [] };
        }
      })
    );

    return repositoriesWithContributors;
  } catch (error: any) {
    console.error("Erro ao chamar API do GitHub:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao buscar repositórios do GitHub");
  }
};

export { getUserRepos, searchRepos };