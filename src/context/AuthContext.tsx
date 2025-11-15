import React, { createContext, useContext, useEffect, useState } from 'react';

type StoredUser = {
  username: string;
  password: string;
  name?: string
};

export type User = { username: string; name?: string; defaultQuery?: string };

interface AuthContextType {
  user: User | null;
  register: (u: StoredUser) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FEATURE_TERMS = [
  'Marvel',
  'Batman',
  'Star Wars',
  'Avengers',
  'Harry Potter',
  'Lord of the Rings',
  'Matrix',
  'Inception',
  'Jurassic Park',
  'Pirates',
  'Bond',
  'Spider-Man',
  'Toy Story',
  'Frozen',
];

function pickRandomTerm() {
  return FEATURE_TERMS[Math.floor(Math.random() * FEATURE_TERMS.length)];
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    const existing = localStorage.getItem('users');
    if (!existing) {
      fetch('/users.json')
        .then((r) => r.json())
        .then((data: StoredUser[]) =>
          localStorage.setItem('users', JSON.stringify(data))
        )
        .catch(() => { });
    }
  }, []);

  const register = (u: StoredUser) => {
    const usersRaw = localStorage.getItem('users') || '[]';
    const users: StoredUser[] = JSON.parse(usersRaw);
    if (users.find((x) => x.username === u.username))
      throw new Error('User already exists');
    users.push(u);
    localStorage.setItem('users', JSON.stringify(users));
    const safe: User = { username: u.username, name: u.name };
    localStorage.setItem('auth_user', JSON.stringify(safe));
    setUser(safe);
  };

  const login = (username: string, password: string) => {
    const usersRaw = localStorage.getItem('users') || '[]';
    const users: StoredUser[] = JSON.parse(usersRaw);
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) throw new Error('Invalid username or password');

    // pick a random featured query for this login (refreshes each login)
    const defaultQuery = pickRandomTerm();
    const safe: User = {
      username: found.username,
      name: found.name,
      defaultQuery,
    };
    localStorage.setItem('auth_user', JSON.stringify(safe));
    setUser(safe);
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
