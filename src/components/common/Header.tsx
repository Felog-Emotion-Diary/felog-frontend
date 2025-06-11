import { Link, useLocation } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { HeaderWrapper } from "../../style/HeaderStyle";
import logo from "../../assets/Logo.png";
import { handleLogout } from "./Logout";
import { useDiaryStore } from "../../store/DiaryStore";

function Header() {
  const date = new Date();
  const todayString = `${date.getFullYear()}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
  const location = useLocation();
  const hasTodayDiary = useDiaryStore((state) => state.hasTodayDiary);

  return (
    <HeaderWrapper>
      <div className="left">
        <h1 className="logo">
          <Link to="/main">
            <img src={logo} alt="logo" />
          </Link>
        </h1>

        <nav className="menu">
          <Link
            to={`/write?date=${todayString}`}
            className={
              location.pathname === "/write"
                ? "active"
                : hasTodayDiary
                ? "disabled"
                : ""
            }
            onClick={(e) => {
              if (hasTodayDiary) e.preventDefault();
            }}
          >
            일기작성
          </Link>

          <Link
            to="/list"
            className={location.pathname === "/list" ? "active" : ""}
          >
            일기목록
          </Link>
          <Link
            to="/emotion-stats"
            className={location.pathname === "/emotion-stats" ? "active" : ""}
          >
            통계분석
          </Link>
        </nav>
      </div>
      <div className="icons">
        <div className="logout">
          <button onClick={handleLogout}>로그아웃</button>
        </div>
        <div className="icon-group">
          <button aria-label="다크모드 전환">
            <MdLightMode />
          </button>
          <button aria-label="설정">
            <FaCog />
          </button>
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
