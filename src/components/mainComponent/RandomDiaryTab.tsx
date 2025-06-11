import { styled } from "styled-components";
import { ModalStore } from "../../store/ModalStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

function RandomDiaryTab() {
  const setModalOpen = ModalStore((state) => state.setModalOpen);
  const navigate = useNavigate()

  const handleClick = async () => {
    const response = await axiosInstance.get('/api/diaries/random');
    const randomDate = response.data
    navigate(`/main?date=${randomDate.randomDate}`);
    setModalOpen()
  }

  return (
    <RandomDiaryTabStyle onClick={handleClick}>
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
