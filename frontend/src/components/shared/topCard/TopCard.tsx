import PeopleIcon from "@mui/icons-material/People";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { TopCardProps } from "../../../@types/props/topCard.types";
import "./topCard.css";

const TopCard: React.FC<TopCardProps> = ({ bgColor, title, amount }) => {
  return (
    <Card className="card" sx={{ backgroundColor: bgColor }}>
      <CardContent>
        <Typography
          className="card-title"
          sx={{ fontSize: 30, fontWeight: "700" }}
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {amount}
        </Typography>
      </CardContent>
      <Box>
        <Box sx={{ textAlign: "right" }}>
          <PeopleIcon />
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: 15, fontWeight: "700", mt: "4rem", color: "#ffff" }}
            color="text.secondary"
            gutterBottom
          >
            View All
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default TopCard;
