"use client";
import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Loader from "@/components/parts/Loader";
import ProjectList from "@/components/parts/ProjectList";
import AddProjectDialog from "@/components/parts/AddProjectDialog";
import AddTaskDialog from "@/components/parts/AddTaskDialog";

export type Task = {
  id: number;
  title: string;
  status: "Todo" | "In Progress" | "Done";
};
export type Project = { id: number; name: string; tasks: Task[] };

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);

  /** Fetch Projects */
  const getProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /** Add Project */
  const handleAddProject = async (name: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: "New Project" }),
      });
      const newProject = await res.json();
      setProjects((prev) => [...prev, newProject]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /** Save Task (Create/Update) */
  const handleSaveTask = async (
    title: string,
    status: Task["status"] = "Todo"
  ) => {
    if (!selectedProject) return;

    try {
      if (editTask) {
        // Update Task
        setLoading(true);
        const res = await fetch(`/api/tasks`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editTask.id,
            projectId: selectedProject.id,
            title,
            status,
          }),
        });
        const updatedTask = await res.json();

        setProjects((prev) =>
          prev.map((p) =>
            p.id === selectedProject.id
              ? {
                  ...p,
                  tasks: p.tasks.map((t) =>
                    t.id === updatedTask.id ? updatedTask : t
                  ),
                }
              : p
          )
        );
      } else {
        // Create Task
        setLoading(true);
        const res = await fetch(`/api/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: selectedProject.id,
            title,
            status,
          }),
        });
        const newTask = await res.json();

        setProjects((prev) =>
          prev.map((p) =>
            p.id === selectedProject.id
              ? { ...p, tasks: [...p.tasks, newTask] }
              : p
          )
        );
      }
    } catch (err) {
      console.error("Error saving task:", err);
    } finally {
      setLoading(false);
    }
  };

  /** Delete Task */
  const handleDeleteTask = async (taskId: number, projectId: number) => {
    try {
      setLoading(true);
      await fetch(`/api/tasks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, projectId }),
      });

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
            : p
        )
      );
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setLoading(false);
    }
  };

  /** Update Task Status */
  const handleUpdateStatus = async (
    taskId: number,
    projectId: number,
    status: Task["status"]
  ) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, projectId, status }),
      });
      const updatedTask = await res.json();

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                tasks: p.tasks.map((t) =>
                  t.id === updatedTask.id ? updatedTask : t
                ),
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h5" className="font-bold">
            Projects
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenProjectDialog(true)}
            className="!rounded-xl normal-case"
          >
            Add Project
          </Button>
        </div>

        <ProjectList
          projects={projects}
          onAddTask={(project) => {
            setSelectedProject(project);
            setEditTask(null);
            setOpenTaskDialog(true);
          }}
          onEditTask={(project, task) => {
            setSelectedProject(project);
            setEditTask(task);
            setOpenTaskDialog(true);
          }}
          onDeleteTask={handleDeleteTask}
          onUpdateStatus={handleUpdateStatus}
        />

        <AddProjectDialog
          open={openProjectDialog}
          onClose={() => setOpenProjectDialog(false)}
          onSave={handleAddProject}
        />

        <AddTaskDialog
          open={openTaskDialog}
          onClose={() => setOpenTaskDialog(false)}
          onSave={handleSaveTask}
          editTask={editTask}
        />
      </div>
    </>
  );
};

export default Dashboard;
