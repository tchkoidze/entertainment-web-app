import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Login, SignUp } from "./pages";

function App() {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
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
