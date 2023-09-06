import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useToasts } from "../../toasts/useToasts";
import { ICreateCoursePayload, useCourseAPI } from "../../services/useCourseAPI";

interface ICreateCourseDialogProps {
  isOpenCreateCourseDialog: boolean;
  setOpen: () => void;
}

export default function CreateCourseDialog(props: ICreateCourseDialogProps) {
  //props
  const { isOpenCreateCourseDialog, setOpen } = props;

  //hooks
  const { successToast, errorToast } = useToasts();
  const {createCourse} = useCourseAPI()

  //states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState<string>("");

  //functions
  const handleClose = () => {
    setOpen();
  };

  const handleCreateCourse = async () => {
    try {
      const payload:ICreateCoursePayload = {
        title,
        description,
        imageLink,
        price: parseInt(price)
      };
      
      const res = await createCourse(payload);

      console.log(res?.data);
      successToast("Course created!");
      setTitle("");
      setDescription("");
      setPrice("");
      setImageLink("");
      setOpen();
    } catch (err) {
      console.log(err);
      errorToast(`Something went wrong ${err}`);
    }
  };

  return (
    <div>
      <Dialog open={isOpenCreateCourseDialog} onClose={handleClose}>
        <DialogTitle fontWeight={600} fontSize={24}>
          Create Course
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
            onChange={(e) => setPrice(e.target.value)}
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
          <Button onClick={handleCreateCourse} variant="contained" size="large">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
