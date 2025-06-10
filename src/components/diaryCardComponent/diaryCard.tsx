import type React from "react";
import { Container } from "../../style/diaryCard.styles";
import type { TPost } from "../weekGroupedComponent/weekGrouped";

type DiaryCardProps = {
  post: TPost
}

export const DiaryCard: React.FC<DiaryCardProps> = ({ post }) => {
  return (
    <Container>
      <div className="imageBox">
      </div>
      <div className="contentBox">
        <div className="titleBox">
          <span className="title">{post.title}</span>
        </div>
        <div className="dateBox">
          <span className="date">{post.createdAt}</span>
        </div>
      </div>
    </Container>
  )
}
