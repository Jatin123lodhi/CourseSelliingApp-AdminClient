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
import axios from "axios";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import { headers } from "./services/useCourseAPI.tsx";
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

            {/* private routes */}
            <Route
              path="/course/:courseId"
              element={
                <PrivateRoute>
                  <CourseDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </Router>
      </RecoilRoot>
    </div>
  );
}

const InitUser = () => {
  //state
  const setUser = useSetRecoilState(userState);

  //function
  const init = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/me`, {
        headers,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default App;
