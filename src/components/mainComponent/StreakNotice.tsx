import React from 'react';
import styled from 'styled-components';

interface StreakNoticeProps {
  streak: number;
  nickname: string;
}

function StreakNotice({ streak, nickname }: StreakNoticeProps) {
  return (
    <NoticeBox>
      <p>🎉 {nickname}님, {streak}일 연속 일기 작성 중이에요!</p>
    </NoticeBox>
  );
}

export default StreakNotice;

const NoticeBox = styled.div`
  padding: 18px 25px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.05);
`;
