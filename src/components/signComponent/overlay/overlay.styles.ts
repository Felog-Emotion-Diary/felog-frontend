import styled from "styled-components"

export const Overlay = styled.div<{ $islogin: boolean }>`
  position : absolute;
  display : flex;
  flex-direction : column;
  width : 50%;
  height : 100%;
  justify-content : center;
  align-items : center;
  background-color : white;
  transform : ${({ $islogin }) => $islogin ? 'translateX(100%)' : 'translateX(0)'};
  transition : transform 0.6s ease-in-out;

  p {
    font-weight : bold;
    font-size : 3rem;
    margin-top : 0;
  }

  span{
    font-size : 1.5rem;
    margin : 3px;
  }
`

export const ImageContainer = styled.div`
  img {
    width : 300px;
  }
`

export const Button = styled.button`
  background-color : #4A4947;
  margin-top : 50px;
  width : 30%;
  height : 4rem;
  font-size : 2rem;
  color : white;
  border : none;
  border-radius : 10px;
  box-shadow: 0 3px 3px gray;
  cursor : pointer;
`
