import React from "react";
import styled from "styled-components";

interface StreakNoticeProps {
  streak: number;
  nickname: string;
}

function StreakNotice({ streak, nickname }: StreakNoticeProps) {
  return (
    <NoticeBox>
      <p>
        🎉 {nickname}님, {streak}일 연속 일기 작성 중이에요!
      </p>
    </NoticeBox>
  );
}

export default StreakNotice;

const NoticeBox = styled.div`
  width: 100%;
  padding: 20px 20px;
  font-size: 1.3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;
