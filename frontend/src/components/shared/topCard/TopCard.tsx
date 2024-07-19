import PeopleIcon from "@mui/icons-material/People";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { TopCardProps } from "../../../@types/props/topCard.types";
import "./topCard.css";

const TopCard: React.FC<TopCardProps> = ({
  bgColor,
  title,
  avg,
  min,
  max,
  icon,
}) => {
  return (
    <Card className="card" sx={{ backgroundColor: bgColor }}>
      <CardContent sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            className="card-title"
            sx={{ fontSize: 30, fontWeight: "700" }}
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Box sx={{ textAlign: "right", color: "#5c4c40" }}>{icon}</Box>
        </Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Typography component="div">Average</Typography>
          <Typography component="div">Lowest</Typography>
          <Typography component="div">Highest</Typography>
        </Typography>
        <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" component="div">
            {avg}
          </Typography>
          <Typography variant="h4" component="div">
            {min}
          </Typography>
          <Typography variant="h4" component="div">
            {max}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TopCard;
