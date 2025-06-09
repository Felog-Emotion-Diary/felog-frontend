import styled from "styled-components";

export const Container = styled.div`
  display : flex;
  flex-direction : column;
  gap : 2.5rem;
  padding : 1rem 0;
`

export const WeekTitle = styled.span`
  font-size : 1.2rem;
  font-weight : bold;
  margin-bottom : 1rem;
`

export const Grid = styled.div`
  display : grid;
  grid-template-columns : repeat(4, 1fr);
  gap : 1rem;
`
