import baseApi from "@/store/api";
import { clearTokens } from "@/utils/tokenStorage";

export const useLogout = () => {
  const logout = () => {
    clearTokens();
    baseApi.util.resetApiState();
    window.location.href = "/login";
  };
  return { logout };
};
