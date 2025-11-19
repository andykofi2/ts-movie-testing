import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import * as moviesApi from '../features/movies/moviesApi';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../context/AuthContext');

(useAuth as jest.Mock).mockReturnValue({
  user: { username: 'andy', defaultQuery: 'Marvel' },
  logout: jest.fn(),
});

jest.spyOn(moviesApi, 'useSearchMoviesQuery').mockReturnValue({
  data: { Search: [{ Title: 'Batman', Year: '2021', imdbID: '1', Poster: 'p.jpg' }] },
  isLoading: false,
} as any);

describe('Dashboard', () => {
  test('renders movies grid and logout', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/welcome, andy/i)).toBeInTheDocument();
    expect(screen.getByText('Batman')).toBeInTheDocument();

    const searchInput = screen.getByLabelText(/search movies/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Spider-Man' } });
    expect(searchInput.value).toBe('Spider-Man');

    const searchBtn = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchBtn);
  });
});
