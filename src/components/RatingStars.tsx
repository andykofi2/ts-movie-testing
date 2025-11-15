import { Star, StarBorder } from "@mui/icons-material";

export default function RatingStars({ value, onChange }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{ cursor: "pointer" }}
          onClick={() => onChange(s)}
        >
          {value >= s ? <Star color="warning" /> : <StarBorder />}
        </span>
      ))}
    </div>
  );
}