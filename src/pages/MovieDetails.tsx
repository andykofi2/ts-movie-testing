import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, Card, CardMedia, Grid } from "@mui/material";
import { useGetMovieByIdQuery } from "../features/movies/moviesApi";
import RatingStars from "../components/RatingStars";
import MoviePlayer from "../components/MoviePlayer";


export default function MovieDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const { data, isLoading } = useGetMovieByIdQuery(id);
  const [rating, setRating] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Movie not found</p>;




  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        mt={4}
      >
        <Typography variant="h4" gutterBottom>
          {data.Title}
        </Typography>
        <Button variant="contained" onClick={() => nav("/dashboard")}>
          ⬅ Back to Dashboard
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 2,
              }}
            >
              <img
                src={data.Poster}
                alt={data.Title}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body1" sx={{ maxWidth: "70%" }}>
          {data.Plot}
        </Typography>

        {/* ⭐ Rating Section */}
        <Box mt={2}>
          <Typography variant="h6">Rate this movie</Typography>
          <RatingStars value={rating} onChange={setRating} />
        </Box>

        {/* 🎬 Play Movie Button */}
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => setShowPlayer(true)}
        >
          Play Movie
        </Button>


        {/* 🎥 MoviePlayer Centered */}
        {showPlayer && (
          <Box
            mt={4}
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <MoviePlayer src="/videos/sample.mp4" />
          </Box>
        )}
      </Box>
    </Container>
  );
}