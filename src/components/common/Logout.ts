import axios from "axios";

export const handleLogout = async () => {
  const confirmed = window.confirm("로그아웃 하시겠습니까?");
  if (!confirmed) return;

  const token = localStorage.getItem("userToken");

  try {
    await axios.post(
      "/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("userToken");
    alert("로그아웃 성공!");
    window.location.href = "/login";
  } catch (error) {
    console.error("로그아웃 실패:", error);
    alert("로그아웃 중 오류가 발생했습니다.");
  }
};
