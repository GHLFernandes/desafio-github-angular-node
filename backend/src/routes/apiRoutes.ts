import { Router } from "express";
import { getMyRepos, searchGithubRepos } from "../controllers/repositoryController";
import { addFavoriteRepo, listFavoriteRepos } from "../controllers/favoriteController";

const router = Router();

router.get("/meus-repositorios", getMyRepos);
router.get("/busca", searchGithubRepos);

router.get("/favoritos", listFavoriteRepos);
router.post("/favoritos", addFavoriteRepo);

export default router;