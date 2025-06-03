import { styled } from "styled-components";
import { ModalStore } from "../../store/ModalStore";

function RandomDiaryTab() {
  const setModalOpen = ModalStore((state) => state.setModalOpen);

  return (
    <RandomDiaryTabStyle onClick={setModalOpen}>
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
