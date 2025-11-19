import { render, screen, fireEvent } from '@testing-library/react';
import MovieDetails from '../pages/MovieDetails';
import React from 'react';
import * as moviesApi from '../features/movies/moviesApi';
import { BrowserRouter } from 'react-router-dom';

const mockMovie = {
  Title: 'Batman',
  Year: '2021',
  imdbID: '1',
  Poster: 'poster.jpg',
  Plot: 'A hero story',
};

jest.spyOn(moviesApi, 'useGetMovieByIdQuery').mockReturnValue({
  data: mockMovie,
  isLoading: false,
} as any);

describe('MovieDetails', () => {
  test('renders movie details and rating', () => {
    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Batman')).toBeInTheDocument();
    expect(screen.getByText('A hero story')).toBeInTheDocument();

    const playBtn = screen.getByRole('button', { name: /play movie/i });
    fireEvent.click(playBtn);
    expect(screen.getByText(/now playing/i)).toBeInTheDocument();
  });
});
