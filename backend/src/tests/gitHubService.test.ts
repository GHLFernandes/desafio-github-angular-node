import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUserRepos, searchRepos } from '../services/gitHubService';

describe('GitHub Service', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('deve buscar repositórios de um usuário', async () => {
    const username = 'testuser';
    const mockData = [{ name: 'repo1' }, { name: 'repo2' }];

    mock.onGet(`${process.env.GITHUB_BASE_URL}/users/${username}/repos`).reply(200, mockData);

    const result = await getUserRepos(username);

    expect(result).toEqual(mockData);
  });

  it('deve buscar repositórios pelo nome e incluir contribuidores', async () => {
    const query = 'angular';
    const mockData = {
      items: [{ name: 'angular-repo', contributors_url: 'https://api.github.com/repos/angular/contributors' }],
    };

    mock.onGet(`${process.env.GITHUB_BASE_URL}/search/repositories`, { params: { q: query } }).reply(200, mockData);

    const contributorsMock = [{ login: 'dev1' }, { login: 'dev2' }];
    mock.onGet('https://api.github.com/repos/angular/contributors').reply(200, contributorsMock);

    const result = await searchRepos(query);

    expect(result).toMatchObject([
      {
        name: 'angular-repo',
        contributors: [{ login: 'dev1' }, { login: 'dev2' }]
      }
    ]);
  });

  it('deve tratar erro ao buscar repositórios de um usuário', async () => {
    const username = 'invalidUser';
    mock.onGet(`${process.env.GITHUB_BASE_URL}/users/${username}/repos`).reply(404);

    await expect(getUserRepos(username)).rejects.toThrow();
  });

  it('deve tratar erro ao buscar repositórios pelo nome', async () => {
    const query = 'unknown-repo';
    mock.onGet(`${process.env.GITHUB_BASE_URL}/search/repositories`, { params: { q: query } }).reply(500);

    await expect(searchRepos(query)).rejects.toThrow();
  });
});
