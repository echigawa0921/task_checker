import React, { useContext, useState } from "react";
import { Select } from "../select";
import { TaskType } from "../../interfaces/TaskType";
import { taskRequest } from "../../requests/taskRequest";
import { DataContext } from "../../pages/home";
import "./style.css";

interface Props {
  task: TaskType;
  getMatchTask: (id: number) => void;
}

export const Task = (props: Props) => {
  const { dispatch } = useContext(DataContext);
  const [status, setStatus] = useState<number>(props.task.status);
  const listElements: string[] = [
    "ToDo",
    "Pending",
    "Doing(ToDay)",
    "WIP",
    "Check",
    "Done",
  ];

  const changeStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(event.target.value);
    try {
      const tasks: TaskType[] = await taskRequest("updateStatus", {
        data: props.task,
        status: val,
      });
      dispatch({ type: "tasksUpdate", payload: { task: tasks } });
      setStatus(val);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div
      className="task"
      style={{
        backgroundColor:
          new Date(props.task.deadlineDate) > new Date()
            ? "white"
            : "rgb(250, 194, 194)",
      }}
    >
      <span className="task_date">{props.task.deadlineDate}</span>
      <div
        className="task_text_contents"
        onClick={() => props.getMatchTask(props.task.id)}
      >
        <h3 className="task_title">{props.task.name}</h3>
        <p className="task_sentence">{props.task.explanation}</p>
      </div>
      <div className="task_input_contents">
        <Select
          optionElements={listElements}
          changeSelect={changeStatus}
          initialValue={status}
        />
      </div>
    </div>
  );
};