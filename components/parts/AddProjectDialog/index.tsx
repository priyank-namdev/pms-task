import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
};

export const AddProjectDialog = ({ open, onClose, onSave }: Props) => {
  const [projectName, setProjectName] = useState("");

  const handleSave = () => {
    if (projectName.trim()) {
      onSave(projectName);
      setProjectName("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Project Name"
          fullWidth
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectDialog;
