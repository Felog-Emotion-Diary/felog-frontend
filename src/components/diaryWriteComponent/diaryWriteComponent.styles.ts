import styled from "styled-components";

export const EditorSection = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
`

export const DataSection = styled.div`
  margin: 100px 0;
  width : max-content;
  margin-left : 50px;
  display : flex;
  flex-direction : column;
  align-items : start;
  justify-content : space-between;

  .imageContainer {
    margin-top : 20px;
    display: flex;
    align-items : center;
    gap : 2.5rem;
  }

  .itemTitle {
    margin-bottom : 20px;
    align-self : start;
    font-size : 2.3rem;
    font-weight : bold;
  }
`

export const EmotionBox = styled.div<{ $tagcolor: string; $backgroundcolor: string; $selected: boolean } >`
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  gap : 1rem;
  width : 60px;
  opacity : ${({ $selected }) => ($selected ? '100%' : '40%')};
  transition : opacity 0.3s ease-in-out;

  &:hover{
    opacity : 1;
  }

  img {
    width : 90%;
  }

  .emotionTag {
    width : 100%;
    background-color : ${(props) => props.$tagcolor};
    font-size : 1.3rem;
    font-weight : bold;
    text-align : center;
    padding: 3px 7px;
    border-radius : 50px;
  }
`

export const UploadPictureBox = styled.div<{ $path: string | null }>`
  display : flex;
  flex-direction : column;
  align-items : center;


  .preview, .addImage {
    width : 500px;
    height : 300px;
    border-radius : 20px;
    margin-bottom : 1rem;
  }

  .addImage {
    outline: 5px dashed lightgray;
    display: flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    gap : 20px;
    font-size : 2rem;
    color : lightgray;
  }

  .preview {
    background-image : url(${(props) => props.$path});
    background-size : cover;
    background-position : center;
  }

  label {
    width : 500px;
    padding : 10px 0;
    text-align : center;
    font-size : 1.5rem;
    font-weight : bold;
    color : white;
    border-radius : 10px;
    background-color : #4A4947;
    box-shadow : 0 3px 3px gray;
  }

  #fileInput {
    display : none;
  }
`

export const SubmitButton = styled.div`
  font-weight : bold;
  color : white;
  border-radius : 10px;
  text-align : center;
  width : 150px;
  background-color : #4A4947;
  font-size : 1.5rem;
  padding : 10px 0;
`
