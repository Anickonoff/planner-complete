const API_URL = "/api/events";

export const getTasks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    const data = await response.json();
    console.log(`Fetched task ${id}:`, data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    const data = await response.json();
    console.log("Created task:", data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    const data = await response.json();
    console.log(`Updated task ${id}:`, data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    console.log(`Deleted task ${id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
