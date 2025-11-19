

import { render, screen, fireEvent } from '@testing-library/react';
import MovieForm from '../components/ MovieForm';
import React = require('react');
import { title } from 'process';

const mockSave = jest.fn();

//Mock crypto for Node/Jest
global.crypto = { randomUUID: () => '1234-uuid' } as any;

describe(' movieForm test', () => {

  test("submit form with values", () => {
    render(<MovieForm onSubmit={mockSave} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Batman' }
    });

    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: '2021' }
    });

    //Submit
    fireEvent.click(screen.getByTestId('submit-btn'));

    // Assert: check fields that matter, ignore ID and defaults
    expect(mockSave).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'test-id-123',
        title: 'Batman',
        year: '2021',
      })
    );
  });
});
