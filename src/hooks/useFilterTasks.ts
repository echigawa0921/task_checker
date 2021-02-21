import { useReducer } from "react";
import { TaskType } from "../interfaces/TaskType";

export type filterAction = {
  type: "filterTask";
  payload: {
    tasks: TaskType[];
    genreId: number;
  };
};

export const useFilterTasks = (): any => {
  const initialData: TaskType[] = [
    {
      id: 0,
      name: "",
      explanation: "",
      deadlineDate: "",
      status: 0,
      genreId: 0,
    },
  ];

  const reducer = (tasks: TaskType[], action: filterAction) => {
    switch (action.type) {
      case "filterTask":
        const id: number = Number(action.payload.genreId);
        if (id === 0) {
          return action.payload.tasks;
        } else {
          return action.payload.tasks.filter((task: TaskType) => {
            return id === task.genreId;
          });
        }
    }
  };

  const [filteredTasks, tasksDispatch] = useReducer(reducer, initialData);
  return [filteredTasks, tasksDispatch];
};