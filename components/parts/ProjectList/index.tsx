import React from "react";
import { Project, Task } from "../../pages/Dashboard";
import ProjectCard from "../ProjectCard";

type Props = {
  projects: Project[];
  onAddTask: (project: Project) => void;
  onEditTask: (project: Project, task: Task) => void;
  onDeleteTask: (projectId: number, taskId: number) => void;
  onUpdateStatus: (
    projectId: number,
    taskId: number,
    status: Task["status"]
  ) => void;
};

const ProjectList: React.FC<Props> = ({
  projects,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onAddTask={() => onAddTask(project)}
          onEditTask={(task) => onEditTask(project, task)}
          onDeleteTask={(taskId) => onDeleteTask(project.id, taskId)}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default ProjectList;
