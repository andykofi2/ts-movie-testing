export interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type?: string;
  Poster: string;
  Plot?: string;
}

export interface OmdbSearchResponse {
  Search?: OmdbMovie[];
  totalResults?: string;
  Response: string;
}

export interface LocalMovie {
  id: string;
  title: string;
  year: string;
  poster?: string;
  rating?: number;
  notes?: string;
}

export interface User {
  password: string;
  username: string;
  name: string;
}