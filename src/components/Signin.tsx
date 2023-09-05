import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {  useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import axios from "axios"
import { useToasts } from "../toasts/useToasts";
const Signin = () => {
  
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState)

  //hooks
  const navigate = useNavigate();
  const {errorToast} = useToasts()

  //functions
  const handleSignin = async () => {
    
    if (email?.trim()?.length === 0 || password?.trim()?.length === 0)
      return errorToast("Invalid email or password");
    console.log(email, password);
    try {
      const res = await axios.post("http://localhost:3001/admin/login", {  
      headers: {
          email,
          password
        },
      });
    
      localStorage.setItem("token", res?.data.token);        
      console.log(res?.data);
      setUser({isLoading:false,userEmail:email})
       
      navigate('/');
    } catch(err) {
      console.log(err)
      errorToast('Invalid email or password')
    }
  
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col mt-[5%]  gap-2">
        <div className="sm:text-2xl my-2 text-gray-600 text-center font-semibold">
          Welcome to Coursera. Sign in below
        </div>
        <div className="flex flex-col gap-4 w-[330px] sm:w-96  p-6 rounded shadow-lg bg-white">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button size="large" variant="contained" onClick={handleSignin}>
            Signin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
