import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LocalMovie } from './types';

interface MoviesState { 
  items: LocalMovie[]; 
}

const saved = localStorage.getItem('local_movies');
const initialState: MoviesState = { items: saved ? JSON.parse(saved) : [] };

const persist = (items: LocalMovie[]) => localStorage.setItem('local_movies', JSON.stringify(items));

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<LocalMovie>) => {
      state.items.push(action.payload);
      persist(state.items);
    },

    updateMovie: (state, action: PayloadAction<LocalMovie>) => {
      const idx = state.items.findIndex(m => m.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      persist(state.items);
    },

    deleteMovie: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(m => m.id !== action.payload);
      persist(state.items);
    },
    
    setMovies: (state, action: PayloadAction<LocalMovie[]>) => {
      state.items = action.payload;
      persist(state.items);
    },
  },
});

export const { addMovie, updateMovie, deleteMovie, setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;