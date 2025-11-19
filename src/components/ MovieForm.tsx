import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import type { LocalMovie } from '../features/movies/types';

interface Props {
  initial?: LocalMovie;
  onSubmit: (m: LocalMovie) => void;
  onCancel?: () => void;
}

export default function MovieForm({ initial, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [year, setYear] = useState(initial?.year ?? '');
  const [poster, setPoster] = useState(initial?.poster ?? '');
  const [rating, setRating] = useState(initial?.rating ?? 0);
  const [notes, setNotes] = useState(initial?.notes ?? '');

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initial?.id ?? crypto.randomUUID(),
      title,
      year,
      poster,
      rating,
      notes,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handle}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <TextField
        label="Poster URL"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
      />
      <TextField
        label="Rating (0-5)"
        type="number"
        inputProps={{ min: 0, max: 5 }}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <TextField
        label="Notes"
        multiline
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button data-testid="submit-btn" variant="contained" type="submit">
          Save
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
