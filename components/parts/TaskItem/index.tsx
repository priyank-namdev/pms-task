import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Task } from "../../pages/Dashboard";

type Props = {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Task["status"]) => void;
};

const TaskItem: React.FC<Props> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  return (
    <ListItem
      secondaryAction={
        <div className="flex items-center gap-2">
          <Select
            value={task.status}
            onChange={(e) => onStatusChange(e.target.value as Task["status"])}
            size="small"
          >
            <MenuItem value="Todo">Todo</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
          <IconButton edge="end" onClick={onEdit}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" onClick={onDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </div>
      }
    >
      <ListItemText primary={task?.title} />
    </ListItem>
  );
};

export default TaskItem;
