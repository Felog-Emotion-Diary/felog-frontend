import styled from "styled-components";

export const EditorSection = styled.div`
  margin : 100px 0;
  display : flex;
  flex-direction : column;
  align-items : center;
  width : 100%;

  .diaryTitle {
    align-self : center;
    border : none;
    background-color : transparent;
    font-size : 3rem;
    font-weight : bold;
    margin-bottom : 2rem;
    text-indent : 1rem;
  }

  .diaryTitle::placeholder{
    color : lightgray;
  }

  .diaryTitle:focus{
    outline : none;
  }

  .editorBox {
    height :90%;
    width : 80%;

    .w-md-editor {
      border-radius : 20px;
      box-shadow : 0px 3px 10px 1px rgba(79, 79, 79, 0.6);
    }

    .w-md-editor-text-pre > code, .w-md-editor-text-input, .wmde-markdown {
      font-size : 21px !important;
      line-height : 24px !important;
    }

    .w-md-editor-toolbar {
      display : flex;
      gap : 1px;
    }

    .w-md-editor-toolbar button{
      width : 45px;
      height : 45px;
    }

    .w-md-editor-toolbar svg {
      width : 22px;
      height : auto;
    }
  }
`

export const DataSection = styled.div`
  margin: 100px 0;
  width : max-content;
  display : flex;
  flex-direction : column;
  align-items : start;
  justify-content : space-between;
  
  .imageContainer {
    width : auto;
    margin-top : 20px;
    display: flex;
    align-items : center;
    gap : 2.5rem;
    padding : 20px 50px;
    background-color : white;
    border-radius : 15px;
  }

  .itemTitle {
    margin-bottom : 20px;
    align-self : start;
    font-size : 2.3rem;
    font-weight : bold;
  }
`

export const EmotionBox = styled.div<{ $tagcolor: string; $selected: boolean } >`
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
    background-color : #EFEFEF;
    outline : 5px solid lightgray;
    display: flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    gap : 20px;
    font-size : 2rem;
    color : black;
  }

  .preview {
    background-image : url(${(props) => props.$path});
    background-size : cover;
    background-position : center;
    box-shadow : 0px 3px 10px 1px rgba(79, 79, 79, 0.6);
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
    cursor : pointer;
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
  cursor : pointer;
  box-shadow : 0 3px 3px gray;
`
