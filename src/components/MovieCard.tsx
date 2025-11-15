import React from 'react';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import type { LocalMovie } from '../features/movies/types';

interface Props {
  movie: LocalMovie;
  onSelect: (m: LocalMovie) => void;
  onEdit: (m: LocalMovie) => void;
  onDelete: (id: string) => void;
}

export default function MovieCard({
  movie,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={movie.poster || '/placeholder.png'}
        alt={movie.title}
        sx={{ cursor: 'pointer' }}
        onClick={() => onSelect(movie)}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.year}
        </Typography>
        <Typography variant="body2">Rating: {movie.rating ?? '—'}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(movie)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(movie.id)}>
          Delete
        </Button>
        <Button size="small" onClick={() => onSelect(movie)}>
          Open
        </Button>
      </CardActions>
    </Card>
  );
}
