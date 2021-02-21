import axiosBase from "axios";
import { TaskType } from "../interfaces/TaskType";

type action = "fetchTasks" | "createTasks" | "updateTasks" | "deleteTasks" | "updateStatus";

type parameter = { data: TaskType; status?: number };

const api = axiosBase.create({
  baseURL: "http://localhost:3001/tasks",
  responseType: "json",
});

export const taskRequest: (
  action: action,
  parameter?: parameter
) => any = async (action: action, parameter?: parameter) => {
  if (parameter) {
    switch (action) {
      case "createTasks":
        const createTasks = await api.post("/", parameter.data);
        return createTasks.data;
      case "updateTasks":
        const updateTasks = await api.put(`/${parameter.data.id}`, parameter.data);
        return updateTasks.data;
      case "deleteTasks":
        const deleteTasks = await api.delete(`/${parameter.data.id}`);
        return deleteTasks.data;
      case "updateStatus":
        const updateStatus = await api.post(`/${parameter.data.id}/status`, {
          status: parameter.status,
        });
        return updateStatus.data;
      default:
        return null;
    }
  } else {
    switch (action) {
      case "fetchTasks":
        const fetchTasks = await api.get("/");
        return fetchTasks.data;
      default:
        return null;
    }
  }
};