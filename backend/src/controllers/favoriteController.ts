import { Request, Response } from "express";
import { addFavorite, getFavorites } from "../models/favoriteModel";

const addFavoriteRepo = (req: Request, res: Response): void => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "O campo 'name' é obrigatório" });
    return;
  }

  try {
    addFavorite(name);
    res.status(201).json({ message: "Repositório favoritado com sucesso." });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const listFavoriteRepos = (req: Request, res: Response): void => {
  try {
    const favorites = getFavorites();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar favoritos." });
  }
};

export { addFavoriteRepo, listFavoriteRepos }