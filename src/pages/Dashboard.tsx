import React, { useEffect, useState } from 'react';
import { useSearchMoviesQuery } from '../features/movies/moviesApi';
import {
  Grid, TextField, Button, Box, Typography, AppBar, Toolbar,
  Container, Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {

  const { user, logout } = useAuth();
  const nav = useNavigate();

  // Default query from user profile or fallback
  const [query, setQuery] = useState(user?.defaultQuery ?? 'Marvel');
  const [searchKey, setSearchKey] = useState(query);

  const { data, isLoading } = useSearchMoviesQuery(searchKey);

  // Refresh random movies on every login
  useEffect(() => {
    if (user?.defaultQuery) {
      setQuery(user.defaultQuery);
      setSearchKey(user.defaultQuery);
    }
  }, [user?.defaultQuery]);

  const openMovie = (id: string) => nav(`/movie/${id}`);

  return (
    <Box>
      {/* Top Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {user?.name ?? user?.username}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              logout();
              nav('/login');
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Search Area */}
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Search movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={() => setSearchKey(query)}>
            Search
          </Button>
        </Box>

        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Featured Movies
        </Typography>

        {isLoading && <Typography>Loading...</Typography>}

        {/* Movies Grid (Centered, container-scoped) */}
        <Grid container spacing={3} columns={12} justifyContent="center">
          {data?.Search?.slice(0, 12).map((m) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={2} // 6 items per row at desktop width
              key={m.imdbID}
              sx={{ cursor: 'pointer' }}
              onClick={() => openMovie(m.imdbID)}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <img
                  src={m.Poster !== 'N/A' ? m.Poster : '/placeholder.png'}
                  alt={m.Title}
                  style={{
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="subtitle1" noWrap>
                    {m.Title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {m.Year}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
