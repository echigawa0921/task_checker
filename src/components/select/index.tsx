import React from "react";
import { GenreType } from "../../interfaces/GenreType";
import "./style.css";

interface Props {
  genres?: GenreType[];
  changeSelect?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  optionElements?: string[];
  initialValue?: number;
}

const renderOption = (props: Props) => {
  if (props.genres !== undefined) {
    return (
      props.genres &&
      props.genres.map((genre: GenreType) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))
    );
  } else if (props.optionElements !== undefined) {
    const values = props.optionElements;
    return values.map((val, index) => (
      <option key={val} value={index}>
        {val}
      </option>
    ));
  }
};

export const Select = (props: Props) => {
  return (
    <select
      className="select"
      onChange={props.changeSelect}
      value={props.initialValue}
    >
      {props.genres !== undefined && <option value={0}></option>}
      {renderOption(props)}
    </select>
  );
};