import React, { useContext, useState } from "react";
import { Select } from "../../components/select";
import { TaskType } from "../../interfaces/TaskType";
import { taskRequest } from "../../requests/taskRequest";
import { DataContext } from "../../pages/home";
import "./style.css";

interface Props {
  task?: TaskType;
  handleClose: () => void;
  initialValue?: number;
}

export const TaskBody = (props: Props) => {
  const { data, dispatch } = useContext(DataContext);
  const [title, setTitle] = useState<string>(
    (props.task && props.task.name) || ""
  );
  const [genreId, setGenreId] = useState<number>(
    (props.task && props.task.genreId) || 1
  );
  const [explanation, setExplanation] = useState<string>(
    (props.task && props.task.explanation) || ""
  );
  const [deadlineDate, setDeadlineDate] = useState<string>(
    (props.task && props.task.deadlineDate) || ""
  );

  const handleChangeGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenreId(Number(event.target.value));
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeExplanation = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExplanation(event.target.value);
  };

  const handleChangeDeadlineDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeadlineDate(event.target.value);
  };

  const onClickSubmit = async () => {
    const requestData = {
      id: (props.task && props.task.id) || 0,
      name: title,
      genreId: genreId,
      explanation: explanation,
      deadlineDate: deadlineDate,
      status: (props.task && props.task.status) || 0,
    };
    if (props.task !== undefined) {
      try {
        const tasks: TaskType[] = await taskRequest("updateTasks", {
          data: requestData,
        });
        dispatch({ type: "tasksUpdate", payload: { task: tasks } });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        const tasks: TaskType[] = await taskRequest("createTasks", {
          data: requestData,
        });
        dispatch({ type: "tasksUpdate", payload: { task: tasks } });
      } catch (err) {
        console.log(err.message);
      }
    }
    props.handleClose();
  };

  const handleOnDelete = async () => {
    try {
      if (props.task) {
        const tasks: TaskType[] = await taskRequest("deleteTasks", {
          data: props.task
        });
        dispatch({ type: "tasksUpdate", payload: { task: tasks } });
      }
      props.handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="modal_body">
      <h2 className="input_menu">タスクを追加</h2>
      <div>
        <h4 className="input_title">ジャンル</h4>
        <div className="task_genre">
          <Select
            genres={data.genresData}
            changeSelect={handleChangeGenre}
            initialValue={genreId}
          />
        </div>
        <h4 className="input_title">タイトル</h4>
        <input type="text" value={title} onChange={handleChangeTitle} />
        <h4 className="input_title">説明</h4>
        <textarea value={explanation} onChange={handleChangeExplanation} />
        <h4 className="input_title">期限</h4>
        <input
          className="input_date"
          type="date"
          value={deadlineDate}
          onChange={handleChangeDeadlineDate}
        />
      </div>
      <input
        className="input_submit"
        type="button"
        value="送信"
        onClick={onClickSubmit}
      />
      { props.task && (
        <button className="button delete_button" type="button" onClick={handleOnDelete} >
          このタスクを削除する
        </button>
      )}
    </form>
  );
};