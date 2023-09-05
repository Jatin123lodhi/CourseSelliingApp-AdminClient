import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CreateCourseDialog from "./dialogs/CreateCourseDialog";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { isUserLoading } from "../selectors/isUserLoading";
import { userEmailState } from "../selectors/userEmail";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const [isOpenCreateCourseDialog, setIsOpenCreateCourseDialog] =
    useState(false);

  if (userLoading) return <div>Loading...</div>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({
      isLoading: false,
      userEmail: null,
    });
    navigate("/");
  };

  return (
    <div className="flex justify-between  px-[3%] items-center py-4 bg-white shadow">
      <Link to={"/"}>
        <div className="text-2xl text-gray-600 font-semibold">Coursera</div>
      </Link>

      {/* mobile view */}
      <span className="sm:hidden">
        <Sidebar
          openDialog={() => setIsOpenCreateCourseDialog(true)}
          isOpenCreateCourseDialog={isOpenCreateCourseDialog}
        />
        <CreateCourseDialog
          isOpenCreateCourseDialog={isOpenCreateCourseDialog}
          setOpen={() => setIsOpenCreateCourseDialog(!isOpenCreateCourseDialog)}
        />
      </span>

      {/* web view */}
      <div className="hidden  sm:flex gap-2 items-center">
        {userEmail || localStorage.getItem("token") ? (
          <>
            <Link to={"/courses"}>
              <Button variant="outlined">Courses</Button>
            </Link>
            <CreateCourseDialog
              isOpenCreateCourseDialog={isOpenCreateCourseDialog}
              setOpen={() =>
                setIsOpenCreateCourseDialog(!isOpenCreateCourseDialog)
              }
            />
            <Button
              variant="outlined"
              onClick={() => setIsOpenCreateCourseDialog(true)}
            >
              Create Course
            </Button>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to={"/signup"}>
              <Button variant="contained">Sign up</Button>
            </Link>
            <Link to={"/signin"}>
              <Button variant="contained">Sign in</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
