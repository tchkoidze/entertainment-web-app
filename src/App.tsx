import styled from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login, Movies, SignUp, TVSeries, Trending } from "./pages";

import ButtonAppBar from "./layouts/Header";
import BookMarked from "./pages/Bookmarked/BookMarked";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/", "/signup"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <Main>
      {shouldShowHeader && <ButtonAppBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
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
  background-color: var(--dark);
  width: 100%;
  height: 100%;
`;
