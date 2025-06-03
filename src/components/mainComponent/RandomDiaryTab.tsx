import { styled } from "styled-components";
import { ModalStore } from "../../store/ModalStore";
import { useNavigate } from "react-router-dom";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function RandomDiaryTab() {
  const setModalOpen = ModalStore((state) => state.setModalOpen);
  const navigate = useNavigate()

  const handleClick = () => {
    const randomDate = getRandomInt(1, 7);
    navigate(`/main?date=2025-06-0${randomDate}`);
    setModalOpen()
  }

  return (
    <RandomDiaryTabStyle onClick={handleClick}>
      <h2 className="tab-title">잊고 있던 하루 💭</h2>
    </RandomDiaryTabStyle>
  );
}

const RandomDiaryTabStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  min-height: 60px;
  background-color: #fffdf8;
  text-align: center;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0 0px;

  .tab-title {
    font-size: 16px;
    font-weight: 500;
    color: #333; 
  }
`;

export default RandomDiaryTab;
