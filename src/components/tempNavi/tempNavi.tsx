import { Link } from "react-router-dom";

export default function TempNavi() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p> 임시 네비게이션 입니다.</p>
      <Link to='/sign'>회원가입 - 로그인</Link>
      <Link to='/diaries/write'>일기 작성 칸</Link>
    </div>
  )
}
