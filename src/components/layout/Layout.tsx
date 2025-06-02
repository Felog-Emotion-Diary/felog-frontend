import styled from "styled-components";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <LayoutStyle>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </LayoutStyle>
  );
}
const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainWrapper = styled.main`
  flex: 1;
  overflow-y: auto;
`;

export default Layout;
