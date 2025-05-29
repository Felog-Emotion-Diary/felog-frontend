import styled from "styled-components";

export const InputFlexbox = styled.div`
  width : 100%;
  display : flex;
  flex-direction: column;
  align-items : center;
  justify-content : center;
  
  span {
    color : red;
    width : 50%;
    margin-bottom : 5px;
    margin-top :20px;
  }
`

export const Form = styled.form`
  width : 80%;
  height : 80%;
  display : flex;
  flex-direction: column;
  align-items : center;
  justify-content : center;
  justify-self : center;
  align-self : center;
  border-radius : 30px;
  background-color : #FAF7F0;
  border : solid 5px #e1d3b3;
`

export const Title = styled.p`
  font-size : 3rem;
`

export const Input = styled.input`
  text-indent : 10px;
  padding : 1.2rem;
  font-size : 1.5rem;
  width : 50%;
  border-radius : 50px;
  border : none;
  box-shadow : 0 3px 3px lightgray;
`

export const Button = styled.button`
  background-color : #4A4947;
  margin-top : 50px;
  width : 55%;
  height : 4rem;
  font-size : 2rem;
  color : white;
  border : none;
  border-radius : 10px;
  box-shadow: 0 3px 3px gray;
  cursor : pointer;
`

export const BetweenFlexbox = styled.div`
  width : 55%;
  display : flex;
  justify-content : space-between;
`

export const RowFlexbox = styled.div`
  padding : 0 20px;
  display : flex;
  justify-content: end;
  align-items : center;
  gap : 30px;
`

export const PageMove = styled.button`
  border : none;
  background-color : transparent;
  font-size : 1rem;
  cursor : pointer;
`
