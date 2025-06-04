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
    margin-bottom : 0.3rem;
    margin-top :0.6rem;
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
  border-radius : 2rem;
  background-color : #FAF7F0;
  border : solid 0.4rem #e1d3b3;
`

export const Title = styled.span`
  font-size : 2.5rem;
  margin-bottom : 2.75rem;
`

export const Input = styled.input`
  text-indent : 0.6rem;
  padding : 1rem;
  font-size : 1.5rem;
  width : 50%;
  border-radius : 3rem;
  border : none;
  box-shadow : 0 0.2rem 0.2rem lightgray;
`

export const Button = styled.button`
  background-color : #4A4947;
  margin-top : 3rem;
  width : 55%;
  height : 3.5rem;
  font-size : 1.5rem;
  color : white;
  border : none;
  border-radius :0.6rem;
  box-shadow: 0 0.2rem 0.2rem gray;
  cursor : pointer;
`

export const BetweenFlexbox = styled.div`
  width : 55%;
  display : flex;
  justify-content : space-between;
  padding-top : 1rem;
  
  label {
    padding-left : 20px;

    input[type='checkbox']{
      margin-right : 0.5rem;
    }
  }
`

export const RowFlexbox = styled.div`
  padding : 0 1.25rem;
  display : flex;
  justify-content: end;
  align-items : center;
  gap : 2rem;
`

export const PageMove = styled.button`
  border : none;
  background-color : transparent;
  font-size : 1rem;
  cursor : pointer;
`
