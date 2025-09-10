import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Task } from "../../pages/Dashboard";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (title: string, status?: Task["status"]) => void;
  editTask: Task | null;
};

const AddTaskDialog: React.FC<Props> = ({
  open,
  onClose,
  onSave,
  editTask,
}) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Todo");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setStatus(editTask.status);
    } else {
      setTitle("");
      setStatus("Todo");
    }
  }, [editTask, open]);

  const handleSave = () => {
    if (title.trim() === "") return;
    onSave(title, status);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editTask ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value as Task["status"])}
          >
            <MenuItem value="Todo">Todo</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {editTask ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
