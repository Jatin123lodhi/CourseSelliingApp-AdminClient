import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BiEdit as EditIcon } from "react-icons/bi";
import { useState } from "react";
import { ICourseDetails } from "../CourseDetails";
import { useToasts } from "../../toasts/useToasts";
import { useCourseAPI } from "../../services/useCourseAPI";

interface IUpdateCourseDialogProps{
  course: ICourseDetails
  onCourseUpdateSuccess : ()=>void
}

export default function UpdateCourseDialog(props:IUpdateCourseDialogProps) {
  //states
  const { course, onCourseUpdateSuccess } = props;
  const [title, setTitle] = useState(course?.title);
  const [description, setDescription] = useState(course?.description);
  const [imageLink, setImageLink] = useState(course?.imageLink);
  const [price, setPrice] = useState<number>(course?.price);
  const [open, setOpen] = useState(false);

  //hooks
  const {successToast} = useToasts()
  const {updateCourse} = useCourseAPI()

  //functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...course,
        title,
        description,
        imageLink,
        price,
      };
      const res = await updateCourse(payload)
      successToast('Course updated!')
      console.log(res?.data);
      setOpen(false);
      onCourseUpdateSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="cursor-pointer w-max" onClick={handleClickOpen}>
        <EditIcon className="w-6 h-6 " />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={600} fontSize={24}>
          Update Course
        </DialogTitle>
        <DialogContent>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="outlined"
          />

          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={4}
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            margin="dense"
            label="Image Link"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            margin="dense"
            label="Price"
            fullWidth
            variant="outlined"
            type="number"
          />
        </DialogContent>
        <DialogActions style={{ paddingRight: "16px", paddingBottom: "16px" }}>
          <Button onClick={handleClose} variant="outlined" size="large">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" size="large">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
