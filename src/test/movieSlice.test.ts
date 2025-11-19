import moviesReducer, { addMovie, updateMovie, deleteMovie, setMovies } from '../features/movies/movieSlice';
import type { LocalMovie } from '../features/movies/types';

describe('movieSlice', () => {
  const initialState = { items: [] };
  const movie: LocalMovie = { id: '1', title: 'Test', year: '2020' };

  beforeEach(() => localStorage.clear());

  test('addMovie adds a movie', () => {
    const state = moviesReducer(initialState, addMovie(movie));
    expect(state.items).toContainEqual(movie);
  });

  test('updateMovie updates a movie', () => {
    const state = moviesReducer({ items: [movie] }, updateMovie({ ...movie, title: 'Updated' }));
    expect(state.items[0].title).toBe('Updated');
  });

  test('deleteMovie removes a movie', () => {
    const state = moviesReducer({ items: [movie] }, deleteMovie('1'));
    expect(state.items).toHaveLength(0);
  });

  test('setMovies replaces movies', () => {
    const state = moviesReducer(initialState, setMovies([movie]));
    expect(state.items).toHaveLength(1);
  });
});