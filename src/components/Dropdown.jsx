import React from "react";
import { capitalize } from "../utils/capitalize";

export default function Dropdown({ title, options, setterFunction }) {
  return (
    <select
      onChange={setterFunction}
      defaultValue="default"
      className="block cursor-pointer outline-none border border-white rounded-md text-white placeholder:text-white bg-transparent py-1.5 px-3"
    >
      <option value="default" disabled className="bg-slate-800">
        {title}
      </option>

      {options.map((option, i) => (
        <option
          key={i}
          value={option.value}
          className="cursor-pointer bg-slate-800"
        >
          {capitalize(option)}
        </option>
      ))}
    </select>
  );
}
