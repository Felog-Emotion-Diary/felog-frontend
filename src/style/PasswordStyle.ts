import styled from "styled-components";

export const FullPage = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #FAF7F0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    margin-bottom: 24px;
    font-size: 1.6rem;
  }
`;

export const Input = styled.input`
  width: 350px;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  font-size: 1.2rem;
  outline: none;

  &:focus {
    border-color: #999;
  }
`;

export const Button = styled.button`
  width: 380px;
  padding: 12px;
  background-color: #4A4947;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 6px;
  margin-top: 15px;

  &:hover {
    background-color: #444;
  }
`;
