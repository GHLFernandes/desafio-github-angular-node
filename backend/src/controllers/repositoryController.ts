import { Request, Response } from "express";
import { getUserRepos, searchRepos } from "../services/gitHubService";

const getMyRepos = async (req: Request, res: Response): Promise<void> => {
  try {
    const repos = await getUserRepos("GHLFernandes");
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar repositórios" });
  }
};

const searchGithubRepos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;
    if (!query) {
      res.status(400).json({ error: "O parâmetro 'query' é obrigatório" });
      return;
    }
    const repos = await searchRepos(query as string);
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar repositórios" });
  }
}

export { getMyRepos, searchGithubRepos }