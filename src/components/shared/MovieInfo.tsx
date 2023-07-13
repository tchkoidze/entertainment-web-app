import { Box, Typography } from "@mui/material";
import { MovieIcon } from "../../svg";
import React from "react";

interface MovieIconProps {
  category: string;
  year: number;
  rating: string;
  title: string;
}

const AboutMovie: React.FC<MovieIconProps> = ({
  category,
  year,
  rating,
  title,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: "6px",
          alignItems: "center",
        }}
      >
        <Typography
          component="span"
          sx={{
            color: "#fff",
            fontFamily: "Outfit",
            fontSize: "11px",
            fontWeight: 300,
            lineHeight: "normal",
          }}
        >
          {year}
        </Typography>
        <Box
          sx={{
            width: "2px",
            height: "2px",
            backgroundColor: "#ffffff",
          }}
        ></Box>
        {/*<MovieIcon category={r.category}></MovieIcon>*/}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MovieIcon category={category}></MovieIcon>
          <Typography
            component="p"
            sx={{
              color: "#fff",
              fontFamily: "Outfit",
              fontSize: "11px",
              fontWeight: 300,
              lineHeight: "normal",
            }}
          >
            {category}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "2px",
            height: "2px",
            backgroundColor: "#ffffff",
          }}
        ></Box>
        <Typography
          component="span"
          sx={{
            color: "#fff",
            fontFamily: "Outfit",
            fontSize: "11px",
            fontWeight: 300,
            lineHeight: "normal",
          }}
        >
          {rating}
        </Typography>
      </Box>
      <Typography
        component="h3"
        sx={{
          color: "#FFF",
          fontFamily: "Outfit",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default AboutMovie;
