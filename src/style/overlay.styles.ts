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
    margin-bottom : 2.5rem;
  }

  span{
    font-size : 1.25rem;
    margin : 0.25rem;
  }
`

export const ImageContainer = styled.div`
  img {
    width : 17rem;
  }
`

export const Button = styled.button`
  background-color : #4A4947;
  margin-top : 3rem;
  width : 30%;
  height : 4rem;
  font-size : 1.5rem;
  color : white;
  border : none;
  border-radius : 1rem;
  box-shadow: 0 0.3rem 0.3rem gray;
`
