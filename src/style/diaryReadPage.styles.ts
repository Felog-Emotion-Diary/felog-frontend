import styled from "styled-components";
import type React from "react";

export const DiaryMarkdownStyle = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
  margin : 3rem 0;
  width : 100%;
  gap : 1rem;

  .title{
    font-size : 2.5rem;
    font-weight : bold;
    text-indent : 1.75rem;
    width : 80%;
    margin-bottom : 1rem;
  }

  .contents{
    -ms-overflow-style: none;
    width : 80%;
  }

  .contents::-webkit-scrollbar{
    display : none;
  }

  hr{
    border : 1px solid lightgray;
    width : 80%;
  }
`

export const DiaryDataStyle = styled.div`
  width : 100%;
  margin : 3rem 0;
  display : flex;
  flex-direction : column;
  justify-content : space-between;

  .subTitle {
    font-size : 2rem;
    font-weight : bold;
  }

  .imageContainer {
    display : flex;
    justify-content : center;
    margin-top : 1.25rem;
    width : max-content;
    gap : 1.2rem;
    padding : 1rem 0;
    border-radius : 1rem;
  }

  .pic {
    margin-top : 2rem;
  }

  .uploadedImageContainer {
    width : 20vw;
    height : 25vh;
    margin-top : 1rem;
    border-radius : 1rem;
    background-color : lightgray;

    img {
      border-radius : 1rem;
      width : 100%;
      height : 100%;
    }
  }

  .buttonPart {
    width : 90%;
    display : flex;
    justify-content : end;
    gap : 2rem;

    button {
      width : 8rem;
      font-size : 1rem;
      font-weight : bold;
      padding : 0.75rem 1rem;
      border : none;
      border-radius : 1rem;
      cursor : pointer;
    }

    .delete {
      background-color : rgba(248, 48, 48, 0.6);
      color : black;
    }

    .update {
      background-color : #4a4947;
      color : white;
    }
  }
`

export const EmotionBox = styled.div<{ $tagcolor?: string; $selected?: boolean; } >`
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  gap : 1rem;
  width : 4.5rem;
  opacity : ${({ $selected }) => ($selected ? '100%' : '40%')};
  transition : opacity 0.3s ease-in-out;

  // span {
  //   text-align : center;
  //   font-size : 2rem;
  // }

  img {
    width : 3rem;
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

export const MarkdownPreviewStyle: React.CSSProperties = {
  width: '80%',
  height: '60vh',
  overflow: 'scroll',
  overflowX: 'hidden',
  padding: '1rem 1.75rem',
  backgroundColor: 'transparent',
}
