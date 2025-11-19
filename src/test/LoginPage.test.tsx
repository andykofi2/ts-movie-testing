import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockLogin = jest.fn();
(useAuth as jest.Mock) = jest.fn(() => ({ login: mockLogin }));
const mockNav = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNav);

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits login form', () => {
    render(<LoginPage />);

    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'andy' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith('andy', '1234');
    expect(mockNav).toHaveBeenCalledWith('/dashboard');
    //expect(usernameInput).toHaveValue('andy');
    //expect(passwordInput).toHaveValue('1234');
  });
});
