import { moviesApi } from '../features/movies/moviesApi';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get('https://www.omdbapi.com/', (req, res, ctx) => {
    return res(
      ctx.json({ Search: [{ Title: 'Batman', Year: '2021', imdbID: '1', Poster: 'p.jpg' }], Response: 'True' })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('moviesApi', () => {
  test('searchMovies fetch', async () => {
    const result = await moviesApi.endpoints.searchMovies.initiate('Batman');
    expect(result.data?.Search?.[0].Title).toBe('Batman');
  });
});