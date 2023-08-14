import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import Searcher from "../../components/shared/Searcher";
import { Movie } from "../types";
import { AboutMovie } from "../../components/shared";
import { BookmarkedIcon } from "../../svg";
import { getCookie } from "react-use-cookie";

const BASE_URL = import.meta.env.VITE_BACK_URL;

const TVSeries = () => {
  const [films, setfilms] = useState<Movie[] | null>([]);
  const [tvseries, setTvseries] = useState<Movie[] | null>([]);
  const token = getCookie("token");

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(`${BASE_URL}movies`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setfilms(response.data);
      console.log(films);
      console.log(response.data);

      setTvseries(
        await response.data.filter(
          (r: Movie | null) => r && r.category !== "Movie"
        )
      );
    };
    getMovies();
  }, []);

  return (
    <Container>
      <Searcher />
      <Box>
        <Typography component="h1" sx={{ color: "#fff" }}>
          TV Series
        </Typography>
        {tvseries && tvseries.length > 0 && (
          <ImageList gap={15}>
            {tvseries?.map((m) => (
              <ImageListItem key={m.title}>
                <img
                  style={{ borderRadius: "8px" }}
                  src={`http://localhost:3000/movie/${m.thumbnail.regular.small}`}
                ></img>
                <AboutMovie
                  category={m.category}
                  year={m.year}
                  title={m.title}
                  rating={m.rating}
                ></AboutMovie>
                <BookmarkedIcon bookmarked={m.isBookmarked}></BookmarkedIcon>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Container>
  );
};

export default TVSeries;
