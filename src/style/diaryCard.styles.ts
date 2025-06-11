import styled from "styled-components";

export const Container = styled.div<{ $backgroundColor: string, $imageUrl: string }>`
  display : flex;
  flex-direction : column;
  width : 100%;
  height : 15rem;
  background-color : ${(props) => props.$backgroundColor};
  border-radius : 1rem;
  align-items : center;
  box-shadow : 0 3px 5px 0 lightgray;
  transition: box-shadow 0.5s ease-in-out;
  cursor : pointer;
  
  &:hover {
    box-shadow: 0 3px 8px 0 gray;
  }

  .imageBox {
    height : 80%;
    width : 100%;
    border-top-left-radius : 1rem;
    border-top-right-radius : 1rem;
    background : url(${(props) => props.$imageUrl});
    background-size: cover;
  }

  .contentBox {
    width : 85%;
    height : 20%;
    padding : 0.5rem 0.5rem;
    display : flex;
    justify-content : space-between;

    .titleBox {
      height : 100%;
      display : flex;
      align-items : start;
      font-size : 1.5rem;
      font-weight : bold;
      
      .title {
        display : inline-block;
        white-space : nowrap;
        overflow: hidden;
        text-overflow : ellipsis;
        max-width : 12rem;
      }
    }

    .dateBox {
      height : 100%;
      display : flex;
      align-items : end;
    }
  }
`
