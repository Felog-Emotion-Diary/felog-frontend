import { styled } from "styled-components";

function RandomDiaryTab() {
  return (
    <RandomDiaryTabStyle>
      <h2 className="tab-title">잊고 있던 하루 💭</h2>
    </RandomDiaryTabStyle>
  );
}

const RandomDiaryTabStyle = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  min-height: 60px;
  background-color: #fffdf8;
  text-align: center;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0 0px;

  .tab-title {
    font-size: 20px;
    font-weight: 500;
    color: #333;
  }
`;

export default RandomDiaryTab;
