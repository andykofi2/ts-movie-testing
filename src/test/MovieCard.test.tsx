import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '../components/MovieCard';
import React from 'react';
import { LocalMovie } from '../features/movies/types';

const mockMovie: LocalMovie = {
  id: '1',
  title: 'Batman',
  year: '2021',
  poster: 'poster.jpg',
  rating: 4,
};

const mockSelect = jest.fn();
const mockEdit = jest.fn();
const mockDelete = jest.fn();

describe('MovieCard', () => {
  beforeEach(() => jest.clearAllMocks());

  test('renders movie details', () => {
    render(<MovieCard movie={mockMovie} onSelect={mockSelect} onEdit={mockEdit} onDelete={mockDelete} />);

    expect(screen.getByText('Batman')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText(/Rating: 4/i)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /batman/i });
    fireEvent.click(img);
    expect(mockSelect).toHaveBeenCalledWith(mockMovie);
  });

  test('calls edit and delete', () => {
    render(<MovieCard movie={mockMovie} onSelect={mockSelect} onEdit={mockEdit} onDelete={mockDelete} />);

    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.click(screen.getByText(/delete/i));
    fireEvent.click(screen.getByText(/open/i));

    expect(mockEdit).toHaveBeenCalledWith(mockMovie);
    expect(mockDelete).toHaveBeenCalledWith(mockMovie.id);
    expect(mockSelect).toHaveBeenCalledWith(mockMovie);
  });
});