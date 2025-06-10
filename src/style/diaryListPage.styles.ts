import styled from "styled-components";

export const Container = styled.div`
  display : flex;
  flex-direction : column;
  width : 80%;
  margin : 0 auto;
  margin-top : 3rem;
`

export const Header = styled.div`
  display : grid;
  grid-template-areas:
    "a a b"
    "c c c";
  gap : 1rem;
  height : max-content;
  
  .contentSearch {
    grid-area : a;
    display : flex;
    gap : 1rem;
    width : 100%;
  }

  select {
    -webkit-appearance : none;
    -moz-appearance : none;
    appearance : none;
    display : inline-block;
    width : 10rem;
    background : url(/selectArrow.png) no-repeat 95% 50%;
    background-size : 2rem;
    background-color : white;
    text-indent : 0.5rem;
    border : 1px solid gray;
  }

  .searchBar {
    width : 50%;
    text-indent : 1rem;
  }

  select, input {
    border-radius : 0.3rem;
    height : 3rem;
    font-size : 1.2rem;
    border : 2px solid lightgray;
  }

  .searchSubmit {
    width : 6rem;
    font-size : 1.2rem;
    font-weight : bold;
    color : white;
    background-color : #4A4947;
    border-radius : 0.3rem;
  }

  .dateSearch{
    height : 100%;
    cursor : pointer;
  }
`

export const DateContainer = styled.div`
  grid-area : b;
  display : flex;
  justify-content : end;
  gap : 1rem;
  align-items : center;
  
  input{
    text-indent : 1rem;
  }
`

export const TagSelect = styled.div`
  margin-top : 1rem;
  grid-area : c;
  display : flex;
  align-items : center;
  gap : 3rem;

  span {
    font-size : 1.5rem;
    font-weight : bold;
  }

  .emotions {
    display : flex;
    gap : 1.5rem;
  }
`

export const EmotionButton = styled.button<{ $background: string, $selected: boolean }>`
  background-color : ${(props) => props.$background};
  border : none;
  font-size : 1rem;
  font-weight : bold;
  padding : 0.5rem 1.5rem;
  border-radius : 0.5rem;
  opacity : ${({ $selected }) => ($selected ? '100%' : '50%')};
  transition : opacity 0.3s ease-in-out;
`
