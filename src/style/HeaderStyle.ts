import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo img {
    width: 80px;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 50px; 
  }

  .menu {
    display: flex;
    gap: 30px;

    a {
      text-decoration: none;
      font-size: 1.4rem;
      font-weight: bold;
      color: #333;

      &:hover {
        color: #d8d2c2;
      }
    }
  }

  .icons {
    display: flex;
    gap: 16px;

    button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #333;

      &:hover {
        color: #d8d2c2;
      }
    }
  }
`;
