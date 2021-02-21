import axiosBase from "axios";
import { GenreType } from "../interfaces/GenreType";

type action = "fetchGenres" | "createGenres" | "deleteGenres";

type parameter = { data: GenreType };

const api = axiosBase.create({
  baseURL: "http://localhost:3001/genres",
  responseType: "json",
});

export const genreRequest: (
  action: action,
  parameter?: parameter
) => any = async (action: action, parameter?: parameter) => {
  if (parameter) {
    switch (action) {
      case "createGenres":
        const createGenres = await api.post("/", parameter.data);
        return createGenres.data;
      case "deleteGenres":
        const deleteGenres = await api.delete(`/${parameter.data.id}`);
        return deleteGenres.data;
      default:
        return null;
    }
  } else {
    switch (action) {
      case "fetchGenres":
        const fetchGenres = await api.get("/");
        return fetchGenres.data;
      default:
        return null;
    }
  }
};