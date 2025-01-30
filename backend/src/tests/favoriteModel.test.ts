import fs from 'fs';
import path from 'path';
import { getFavorites, addFavorite } from '../models/favoriteModel';

jest.mock('fs');

describe('FavoriteModel', () => {
  const FILE_PATH = path.resolve(__dirname, '../../data/favorites.json');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve garantir que o arquivo exista', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    getFavorites();

    expect(fs.existsSync).toHaveBeenCalledWith(FILE_PATH);
    expect(fs.writeFileSync).toHaveBeenCalledWith(FILE_PATH, JSON.stringify([]), 'utf-8');
  });

  it('deve retornar os favoritos corretamente', () => {
    const mockData = JSON.stringify([{ name: 'repo1' }, { name: 'repo2' }]);
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

    const favorites = getFavorites();

    expect(fs.readFileSync).toHaveBeenCalledWith(FILE_PATH, 'utf-8');
    expect(favorites).toEqual([{ name: 'repo1' }, { name: 'repo2' }]);
  });

  it('deve adicionar um novo favorito', () => {
    const mockData = JSON.stringify([{ name: 'repo1' }]);
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    addFavorite('repo2');

    expect(fs.writeFileSync).toHaveBeenCalledWith(FILE_PATH, JSON.stringify([{ name: 'repo1' }, { name: 'repo2' }], null, 2), 'utf-8');
  });

  it('deve lançar erro ao tentar favoritar um repositório já existente', () => {
    const mockData = JSON.stringify([{ name: 'repo1' }]);
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

    expect(() => addFavorite('repo1')).toThrow('Repositório já está favoritado.');
  });
});