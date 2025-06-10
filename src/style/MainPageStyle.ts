import styled from "styled-components";

export const MainPageStyle = styled.main`
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  gap:48px;
`;

export const MainContentWrapper = styled.div`
margin-top: 35px;
  display: flex;
  gap: 40px;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1500px;
  width: 100%;
`;

export const CalendarWrapper = styled.div`
  min-width: 600px;
  max-width: 900px;
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 20px;
`;
