import styled from "styled-components";

export const Container = styled.div<{ $background: string }>`
  display : grid;
  width : 100vw;
  height : 100vh;
  overflow : hidden;
  grid-template-rows : 1fr;
  grid-template-columns : 6fr 4fr;
  background-color : ${(props) => props.$background};
  transition : background-color 1s ease-in-out;
`

export const ExitButton = styled.div`
  position : absolute;
  padding : 2.5rem 0 0 3rem;
  width : 3rem;
  height : 3rem;
  font-size : 2.5rem;
  color : #4A4947;
  opacity : 0.3;
  transition : opacity 0.3s ease-in-out;
  cursor : pointer;

  &:hover{
    opacity : 1;
  }
`
