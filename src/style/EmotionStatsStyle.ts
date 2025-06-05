import styled from "styled-components";

export const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const DateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  input {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  span {
    font-size: 16px;
    color: #666;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 20px;
  max-width: 1300px;
  margin: 0 auto;
`;

export const ChartBox = styled.div`
  grid-row: span 2;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  grid-column: span 3;
`;

export const ChartCard = styled.div`
  background-color: white;
  padding: 10px 15px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const ChartCardTitle = styled.h2`
padding: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;
