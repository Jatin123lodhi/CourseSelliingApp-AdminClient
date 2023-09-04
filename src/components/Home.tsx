import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../selectors/userEmail";
const Home = () => {
  
  const userEmail = useRecoilValue(userEmailState)
  
  return (
    <div className="flex flex-col  lg:flex-row lg:justify-around gap-4 px-4 sm:pt-8">
      

      {/* left section */}
      <div className="flex flex-col gap-1 text-gray-700 py-4 mt-[8%]">
        <div className="text-4xl font-thin">Coursera Admin</div>
        <div className="font-bold mb-3">A place to learn,earn and grow</div>
        {/* buttons- signup and signin */}
        {userEmail ? (
          <div>
            <Link to={"/courses"}>
              <Button variant="contained" size="large">Checkout courses</Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 items-center ">
            <Link to={"/signup"}>
              <Button variant="contained">Sign up</Button>
            </Link>
            <Link to={"/signin"}>
              <Button variant="contained">Sign in</Button>
            </Link>
          </div>
        )}
      </div>

      {/* right section  */}
      <div className="flex flex-col items-center">
        <img
          className="w-full rounded-md"
          src="https://img.freepik.com/premium-photo/studying-with-video-online-lesson-home_256588-1500.jpg"
          alt="poster"
        />
      </div>
    </div>
  );
};

export default Home;
