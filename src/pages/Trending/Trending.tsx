import { useEffect, useState } from "react";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";

import styled from "styled-components";

import axios from "axios";
import { Movie } from "../types";

import { AboutMovie } from "../../components/shared";
import Searcher from "../../components/shared/Searcher";
import { BookmarkedIcon } from "../../svg";
import { getCookie } from "react-use-cookie";

const BASE_URL = import.meta.env.VITE_BACK_URL;

const Trending = () => {
  const [films, setfilms] = useState<Movie[] | null>([]);
  const [trending, setTrending] = useState<Movie[] | null>([]);
  const [recommended, setRecommended] = useState<Movie[] | null>([]);
  const token = getCookie("token");

  useEffect(() => {
    console.log("token: ", token);
    const getMovies = async () => {
      const response = await axios.get(`${BASE_URL}/api/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setfilms(response.data);
      console.log(films);
      console.log(response.data);
      const trendings = response.data.filter(
        (m: Movie | null) => m && m.isTrending === true
      );
      setTrending(trendings);
      setRecommended(
        response.data.filter((r: Movie | null) => r && r.isTrending === false)
      );
      /*setTrending(
        await response.data.filter(
          (m: Movie | null) => m && m.isTrending == true
        )
      );*/
    };
    getMovies();
  }, []);
  return (
    <Container>
      {/*<Box display={"flex"} alignItems={"center"}>
        <SvgIcon>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
              fill="#FFF"
            />
          </svg>
        </SvgIcon>
        <Search
          id="search"
          name="search"
          placeholder="Search for movies or TV series"
          color="primary"
        />
  </Box>*/}
      <Searcher />
      <Box>
        <Typography component="h1" sx={{ color: "#fff" }}>
          Trending
        </Typography>
        {trending && trending.length > 0 && (
          <StyledImageList>
            {trending.map((x) => (
              <ImageListItem key={x.title} sx={{ width: "240px" }}>
                <ImageListItemBar title={x.title} />
                <img
                  src={`${BASE_URL}/movie/${x.thumbnail.trending.small}`}
                  alt=""
                />
              </ImageListItem>
            ))}
          </StyledImageList>
        )}
      </Box>
      <Box>
        <Typography component="h2" sx={{ color: "#fff" }}>
          Recommended for you
        </Typography>
        {recommended && recommended.length > 0 && (
          <RecomendedImages>
            {recommended.map((r) => (
              <ImageListItem key={r.title} sx={{ position: "relative" }}>
                <img
                  style={{ borderRadius: "8px" }}
                  src={`${BASE_URL}/movie/${r.thumbnail.regular.small}`}
                ></img>
                <AboutMovie
                  category={r.category}
                  year={r.year}
                  title={r.title}
                  rating={r.rating}
                ></AboutMovie>
                <BookmarkedIcon bookmarked={r.isBookmarked}></BookmarkedIcon>
              </ImageListItem>
            ))}
          </RecomendedImages>
        )}
      </Box>
    </Container>
  );
};

export default Trending;

/*const Search = styled(TextField)`
  .MuiInputBase-input {
    color: rgba(255, 255, 255, 0.5);
    width: 228px;
  }
`;*/

const StyledImageList = styled(ImageList)`
  display: flex !important;
  flex-wrap: nowrap;
  overflow-x: scroll;

  /* Hide the scrollbar */

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* Enable horizontal scrolling with mouse movement */
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  /* Optional: Add more styles for individual ImageListItems */
  & .MuiImageListItem-root {
    display: flex;
    flex-wrap: nowrap;
    flex: 0 0 auto;
    margin-right: 8px;
  }
`;

const RecomendedImages = styled(ImageList)`
  row-gap: 16px !important;
  column-gap: 15px !important;
`;
