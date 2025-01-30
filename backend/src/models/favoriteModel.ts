import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve(__dirname, "../../data/favorites.json");

const ensureFileExists = () => {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]), "utf-8");
  }
};

const getFavorites = (): any[] => {
  ensureFileExists();
  
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao ler arquivo JSON:", error);
    return [];
  }
};

const addFavorite = (name: string): void => {
  ensureFileExists();
  const favorites = getFavorites();

  if (favorites.some((fav) => fav.name === name)) {
    throw new Error("Repositório já está favoritado.");
  }

  favorites.push({ name });
  fs.writeFileSync(FILE_PATH, JSON.stringify(favorites, null, 2), "utf-8");
};

export { getFavorites, addFavorite };