import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 1500px;
  height: 100px;
  padding: 0 24px;
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
      color: #333;

      &:hover {
        color: #d8d2c2;
      }

      &.active {
        font-weight: bold;
      }
    }
  }
  .menu .disabled {
    pointer-events: none;
    color: gray;
    cursor: not-allowed;
  }

  .icons {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .logout button {
    font-size: 16px;
    padding: 6px 12px;
    background: none;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .logout button:hover {
    color: #666;
  }

  .icon-group {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 7px;
  }

  .icon-group button {
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
  }

  .icon-group button:hover {
    color: #666;
  }
`;
