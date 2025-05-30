import styled from "styled-components";

export const Container = styled.div<{ $background: string }>`
  display : grid;
  width : 100vw;
  height : 100vh;
  overflow : hidden;
  grid-template-rows : 1fr;
  grid-template-columns : 6fr 4fr;
  background-color : ${(props) => props.$background}4d;
  transition : background-color 1s ease-in-out;
  
`
