import axios from "axios";
import { BASE_URL } from "../utils/Constants";

export const useAuthAPI = () => {

  const adminLogin = async (email: string, password: string) => {
    const res = await axios.post(`${BASE_URL}/login`, {
      headers: {
        email,
        password,
      },
    });
    return res;
  };

  const adminSignup = async (email: string, password: string) => {
    const res = await axios.post(`${BASE_URL}/signup`, {
      email: email,
      password: password,
    });
    return res;
  };
  
  return {
    adminLogin,
    adminSignup,
  };
};
