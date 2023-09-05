import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import 'react-toastify/dist/ReactToastify.css';
import { useToasts } from "../toasts/useToasts";

const Signup = () => {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);

  //hook
  const navigate = useNavigate();
  const {successToast,errorToast} = useToasts()

  //function
  const handleSignup = async () => {
    if (email?.trim()?.length === 0 || password?.trim()?.length === 0)
      return errorToast("Invalid email or password");
    console.log(email, password);
    try {
      const res = await axios.post("http://localhost:3001/admin/signup", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res?.data.token);
      setEmail("");
      setPassword("");
      console.log(res?.data);
      successToast("Signup Successfull!")
      setUser({ isLoading: false, userEmail: email });
      navigate("/courses");
    } catch (err) {
      console.log(err);
      errorToast("Email already exitst")
    }
  };
  
  return (
    <div className="flex justify-center">
      <div className="flex flex-col mt-[5%]  gap-2">
        <div className="sm:text-2xl my-2 text-gray-600 font-semibold text-center">
          Welcome to Coursera. Sign up below
        </div>
        <div className="flex flex-col gap-4 w-[330px] sm:w-96  p-6 rounded shadow-lg bg-white">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button size="large" variant="contained" onClick={handleSignup}>
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
