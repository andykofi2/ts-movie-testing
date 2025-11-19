import { render, screen, fireEvent } from '@testing-library/react';
import RatingStars from '../components/RatingStars';
import React from 'react';
import { Star, StarBorder } from '@mui/icons-material';

describe('RatingStars', () => {
  const mockChange = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('renders stars and responds to clicks', () => {
    render(<RatingStars value={3} onChange={mockChange} />);

    const stars = screen.getAllByRole('img', { hidden: true }); // MUI icons render as <svg>
    expect(stars.length).toBe(5);

    fireEvent.click(stars[4]);
    expect(mockChange).toHaveBeenCalledWith(5);
  });
});