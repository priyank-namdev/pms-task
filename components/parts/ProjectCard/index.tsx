import React from "react";
import { Typography, Divider, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Project, Task } from "../../pages/Dashboard";
import TaskList from "../TaskList";

type Props = {
  project: Project;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  onUpdateStatus: (projectId: number, taskId: number, status: Task["status"]) => void;
};

const ProjectCard: React.FC<Props> = ({ project, onAddTask, onEditTask, onDeleteTask, onUpdateStatus }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border">
      <Typography variant="h6" className="font-semibold mb-2">{project.name}</Typography>
      <Divider className="mb-3" />

      <TaskList
        tasks={project.tasks}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
        onUpdateStatus={(taskId, status) => onUpdateStatus(project.id, taskId, status)}
      />

      <Button variant="outlined" size="small" startIcon={<Add />} onClick={onAddTask} className="!mt-2 !rounded-xl normal-case">
        Add Task
      </Button>
    </div>
  );
};

export default ProjectCard;
