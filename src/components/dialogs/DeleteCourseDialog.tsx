import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AiFillDelete as DeleteIcon } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "../../toasts/useToasts";
import { useCourseAPI } from "../../services/useCourseAPI";

interface IDeleteCourseDialogProps{
  courseId: string
}

export default function DeleteCourseDialog(props:IDeleteCourseDialogProps) {
  //props
  const { courseId } = props;

  //state
  const [open, setOpen] = useState(false);

  //hooks
  const navigate = useNavigate();
  const {successToast,errorToast} = useToasts()
  const {deleteCourse} = useCourseAPI()

  //functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteCourse(courseId);
      console.log(res?.data);
      setOpen(false);
      successToast('Course deleted!')
      navigate("/courses");
    } catch (err) {
      console.log(err);
      errorToast('Something went wrong!')
    }
  };

  return (
    <div>
      <div className="cursor-pointer w-max" onClick={handleClickOpen}>
        <DeleteIcon className="w-6 h-6 " />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={600} fontSize={24}>
          Delete Course
        </DialogTitle>
        <DialogContent>
          <div>Are you sure you want to delete this course ?</div>
        </DialogContent>
        <DialogActions style={{ paddingRight: "16px", paddingBottom: "16px" }}>
          <Button onClick={handleClose} variant="outlined" size="large">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" size="large">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
