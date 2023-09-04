import { RecoilRoot, useSetRecoilState } from "recoil";
import CourseDetails from "./components/CourseDetails";
import Courses from "./components/Courses";
import Header from "./components/Header";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BASE_URL } from "./utils/Constants";
import { useEffect } from "react";
import { userState } from "./store/atoms/user.ts";
import axios from "axios"
function App() {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Header />
          <InitUser />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

const InitUser = () => {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res?.data?.email) {
        setUser({
          isLoading: false,
          userEmail: res?.data?.email,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (err) {
      console.log(err);
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
};

export default App;
