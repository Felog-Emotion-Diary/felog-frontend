import styled from "styled-components";

export const Container = styled.div`
  display : flex;
  flex-direction : column;
  width : 100%;
  height : 15rem;
  background-color : white;
  border-radius : 1rem;
  align-items : center;

  .imageBox {
    border : 1px solid black;
    height : 80%;
    width : 100%;
    border-radius : 1rem;
  }

  .contentBox {
    width : 80%;
    height : 20%;
    padding : 0.5rem 1.5rem;
    display : flex;
    justify-content : space-between;

    .titleBox {
      display : flex;
      align-items : start;
      font-size : 1.5rem;
      font-weight : bold;
    }

    .contentBox {

    }
  }
`
