import { AuthStore } from "../../store/authStore";

export const handleLogout = () => {
  const confirmed = window.confirm("로그아웃 하시겠습니까?");
  if (!confirmed) return;

  AuthStore.getState().setToken(null); 
  localStorage.removeItem("userToken"); 

  alert("로그아웃 성공!");
  window.location.href = "/sign";
};

