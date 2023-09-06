import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaGraduationCap as CoursesIcon } from "react-icons/fa";
import { MdOutlineAddToPhotos as AddCourseIcon } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrLogout as LogoutIcon } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import CreateCourseDialog from "./dialogs/CreateCourseDialog";
import { userEmailState } from "../selectors/userEmail";

interface ISidebarProps {
  openDialog: () => void;
  isOpenCreateCourseDialog: boolean;
}

export default function Sidebar(props: ISidebarProps) {
  //props
  const { openDialog, isOpenCreateCourseDialog } = props;

  //state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setUser = useSetRecoilState(userState);
  const userEmail = useRecoilValue(userEmailState);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({
      isLoading: false,
      userEmail: null,
    });
    navigate("/");
  };

  const list = () => (
    <Box
      // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={() => setIsOpen(false)}
      onKeyDown={() => setIsOpen(false)}
    >
      <List>
        {userEmail || localStorage.getItem("token") ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/courses")}>
                <ListItemIcon style={{ minWidth: "25px" }}>
                  <CoursesIcon />
                </ListItemIcon>
                <ListItemText primary={"Courses"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => openDialog()}>
                <ListItemIcon style={{ minWidth: "25px" }}>
                  <AddCourseIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Course"} />
              </ListItemButton>
              <CreateCourseDialog
                isOpenCreateCourseDialog={isOpenCreateCourseDialog}
                setOpen={() => openDialog()}
              />
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon style={{ minWidth: "25px" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/signup")}>
                <ListItemText primary={"Signup"} style={{padding:"0px 20px"}} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/signin")}>
                <ListItemText primary={"Signin"} style={{padding:"0px 20px"}} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={() => setIsOpen(true)}>
          <RxHamburgerMenu />
        </Button>
        <Drawer anchor={"left"} open={isOpen} onClose={() => setIsOpen(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
