import { Router } from "express";
import { getMyRepos, searchGithubRepos } from "../controllers/repositoryController";
import { addFavoriteRepo, listFavoriteRepos } from "../controllers/favoriteController";

const router = Router();

/**
 * @swagger
 * /meus-repositorios:
 *   get:
 *     summary: Lista todos os repositórios do usuário autenticado.
 *     description: Retorna uma lista dos repositórios do usuário do GitHub.
 *     responses:
 *       200:
 *         description: Lista de repositórios retornada com sucesso.
 *       500:
 *         description: Erro ao buscar repositórios.
 */
router.get("/meus-repositorios", getMyRepos);

/**
 * @swagger
 * /busca:
 *   get:
 *     summary: Busca repositórios no GitHub.
 *     description: Permite buscar repositórios usando um termo no nome.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Nome ou parte do nome do repositório para buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de repositórios encontrados.
 *       400:
 *         description: O parâmetro 'query' é obrigatório.
 *       500:
 *         description: Erro ao buscar repositórios.
 */
router.get("/busca", searchGithubRepos);

/**
 * @swagger
 * /favoritos:
 *   get:
 *     summary: Lista todos os repositórios favoritos.
 *     description: Retorna uma lista de repositórios que foram marcados como favoritos pelo usuário.
 *     responses:
 *       200:
 *         description: Lista de favoritos retornada com sucesso.
 *       500:
 *         description: Erro ao listar favoritos.
 */
router.get("/favoritos", listFavoriteRepos);

/**
 * @swagger
 * /favoritos:
 *   post:
 *     summary: Adiciona um repositório aos favoritos.
 *     description: Marca um repositório como favorito e o salva no servidor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "angular"
 *     responses:
 *       201:
 *         description: Repositório favoritado com sucesso.
 *       400:
 *         description: O campo 'name' é obrigatório ou o repositório já foi favoritado antes.
 */
router.post("/favoritos", addFavoriteRepo);

export default router;
