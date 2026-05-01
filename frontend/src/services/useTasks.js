//Создание, удаление, редактирование задач с использованием API из файла api.js
import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        const events = Array.isArray(data?.events) ? data.events : [];
        console.log("Fetched tasks:", events);
        setTasks(events);
      } catch (error) {
        setError(error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask?.event]);
    } catch (error) {
      setError(error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      const updated = await updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...(updated?.event ?? task), ...updatedTask }
            : task,
        ),
      );
    } catch (error) {
      setError(error);
    }
  };

  const removeTask = async (id) => {
    try {
      const success = await deleteTask(id);
      if (success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      setError(error);
    }
  };

  return { tasks, loading, error, addTask, editTask, removeTask };
}
