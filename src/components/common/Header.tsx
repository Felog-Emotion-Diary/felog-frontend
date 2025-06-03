import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { HeaderWrapper } from "../../style/HeaderStyle";
import logo from "../../assets/Logo.png";

function Header() {
  const date = new Date();
  const todayString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`

  console.log(todayString);

  return (
    <HeaderWrapper>
      <div className="left">
        <h1 className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </h1>

        <nav className="menu">
          <Link to={`/diaries/write?date=${todayString}`}>일기작성</Link>
          <Link to="/list">일기목록</Link>
          <Link to="/stats">통계보기</Link>
        </nav>
      </div>

      <div className="icons">
        <button aria-label="다크모드 전환">
          <MdLightMode />
        </button>
        <button aria-label="설정">
          <FaCog />
        </button>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
