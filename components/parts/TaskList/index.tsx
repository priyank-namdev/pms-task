import React from "react";
import { List } from "@mui/material";
import { Task } from "../../pages/Dashboard";
import TaskItem from "../TaskItem";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdateStatus: (taskId: number, status: Task["status"]) => void;
};

const TaskList: React.FC<Props> = ({
  tasks = [],
  onEdit,
  onDelete,
  onUpdateStatus,
}) => {
  return (
    <List className="max-h-72 overflow-y-auto">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          onStatusChange={(status) => onUpdateStatus(task.id, status)}
        />
      ))}
    </List>
  );
};

export default TaskList;
