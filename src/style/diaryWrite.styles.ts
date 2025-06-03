import styled from "styled-components";

export const EditorSection = styled.div`
  padding : 6.25rem 0;
  display : flex;
  flex-direction : column;
  align-items : center;
  width : 100%;

  .diaryTitle {
    align-self : center;
    border : none;
    background-color : transparent;
    font-size : 2.5rem;
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
      border-radius : 2rem;
      box-shadow : 0 0.25rem 1rem 0.1rem rgba(79, 79, 79, 0.6);
    }

    .w-md-editor-text-pre > code, .w-md-editor-text-input, .wmde-markdown {
      font-size : 1.5rem !important;
      line-height : 1.75rem !important;
    }

    .w-md-editor-toolbar {
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      display : flex;
      gap : 1px;
    }

    .w-md-editor-toolbar button{
      width : 3rem;
      height : 3rem;
    }

    .w-md-editor-toolbar svg {
      width : 1.25rem;
      height : auto;
    }
  }
`

export const DataSection = styled.div`
  margin: 6.25rem 0;
  width : max-content;
  display : flex;
  flex-direction : column;
  align-items : start;
  justify-content : space-between;
  
  .imageContainer {
    width : 90%;
    margin-top : 1.25rem;
    display: flex;
    align-items : center;
    gap : 1.5rem;
    padding : 1.25rem 3rem;
    background-color : white;
    border-radius : 1.2rem;
  }

  .itemTitle {
    margin-bottom : 1.25rem;
    align-self : start;
    font-size : 1.75rem;
    font-weight : bold;
  }
`

export const EmotionBox = styled.div<{ $tagcolor: string; $selected: boolean } >`
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  gap : 1rem;
  width : 4.5rem;
  opacity : ${({ $selected }) => ($selected ? '100%' : '40%')};
  transition : opacity 0.3s ease-in-out;

  &:hover{
    opacity : 1;
  }

  span {
    text-align : center;
    font-size : 2rem;
  }

  .emotionTag {
    width : 100%;
    background-color : ${(props) => props.$tagcolor};
    font-size : 1rem;
    font-weight : bold;
    text-align : center;
    padding: 3px 7px;
    border-radius : 3rem;
  }
`

export const UploadPictureBox = styled.div<{ $path: string | null }>`
  display : flex;
  flex-direction : column;
  align-items : center;


  .preview, .addImage {
    width : 30rem;
    height : 15rem;
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
    font-size : 1.5rem;
    font-weight : bold;
    color : gray;
  }

  .preview {
    background-image : url(${(props) => props.$path});
    background-size : cover;
    background-position : center;
    box-shadow : 0px 3px 10px 1px rgba(79, 79, 79, 0.6);
  }

  label {
    width : 30rem;
    padding : 1rem 0;
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
  width : 9rem;
  background-color : #4A4947;
  font-size : 1.5rem;
  padding : 10px 0;
  cursor : pointer;
  box-shadow : 0 3px 3px gray;
`
