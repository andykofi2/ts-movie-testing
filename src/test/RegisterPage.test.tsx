import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockRegister = jest.fn();

(useAuth as jest.Mock) = jest.fn(() => ({ register: mockRegister }));

const mockNav = jest.fn();

(useNavigate as jest.Mock).mockReturnValue(mockNav);

describe('RegisterPage', () => {
  beforeEach(() => jest.clearAllMocks());

  test('submits registration form', () => {
    render(<RegisterPage />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Andy' } });
    fireEvent.change(usernameInput, { target: { value: 'andy123' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });

    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerButton);

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'Andy',
      username: 'andy123',
      password: '1234',
    });
    expect(mockNav).toHaveBeenCalledWith('/dashboard');

    expect(nameInput).toHaveValue('Andy');
    expect(usernameInput).toHaveValue('andy123');
    expect(passwordInput).toHaveValue('1234');
  });
});