import styled from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login, Movies, SignUp, TVSeries, Trending, Verify } from "./pages";

import ButtonAppBar from "./layouts/Header";
import BookMarked from "./pages/Bookmarked/BookMarked";
import { useState } from "react";
//import { Verify } from "./pages/Verify";

function App() {
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const location = useLocation();
  const hideHeaderRoutes = ["/", "/signup", "/verify"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <Main>
      {shouldShowHeader && <ButtonAppBar avatarUrl={avatarUrl} />}
      <Routes>
        <Route path="/" element={<Login setAvatarUrl={setAvatarUrl} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvseries" element={<TVSeries />} />
        <Route path="/bookmarked" element={<BookMarked />} />
      </Routes>
    </Main>
  );
}

export default App;

const Main = styled.main`
  //background-color: var(--dark);
  width: 100%;
  height: 100%;
`;
