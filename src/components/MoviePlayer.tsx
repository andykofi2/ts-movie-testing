import { Card, CardContent, Typography } from "@mui/material";

export default function MoviePlayer({ src }) {
  return (
    <Card sx={{ width: "80%", maxWidth: 700, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Now Playing
        </Typography>
        <video
          controls
          width="100%"
          style={{ borderRadius: "12px" }}
          src={src}
        />
      </CardContent>
    </Card>
  );
}