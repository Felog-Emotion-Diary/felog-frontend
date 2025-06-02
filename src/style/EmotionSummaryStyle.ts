import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 18px;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  font-size: 12px;
  color: #888;
  text-decoration: none;
  margin-top: 7px;

  &:hover {
    text-decoration: underline;
    color: #555;
  }

  svg {
    vertical-align: -2px;
  }
`;

export const EmotionList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  justify-items: center;
  margin: 10px;
`;

export const EmotionItem = styled.div`
  text-align: center;
  font-size: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Percentage = styled.div<{ emotion?: string }>`
  margin-top: 6px;
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${({ emotion }) => getEmotionColor(emotion)};
  color: black;
`;

const getEmotionColor = (emotion?: string) => {
  switch (emotion) {
    case "happy":
      return "#fff2c1";
    case "sad":
      return "#cadbff";
    case "angry":
      return "#ffd3d3";
    case "anxious":
      return "#cbcbff";
    case "calm":
      return "#e3f4e4";
    case "neutral":
      return "#b0bec5";
    case "love":
      return "#ffdfa9";
    default:
      return "#ccc";
  }
};
