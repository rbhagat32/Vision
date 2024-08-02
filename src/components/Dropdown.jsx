import React from "react";
import { capitalize } from "../utils/capitalize";

export default function Dropdown({ label, options, setterFunction }) {
  return (
    <div className="relative">
      <label className="pointer-events-none absolute mt-1 ml-3.5 text-lg text-white bg-zinc-900">
        {capitalize(label)}
      </label>

      <select
        onChange={setterFunction}
        defaultValue="default"
        className="block cursor-pointer outline-none border border-white rounded-md text-white placeholder:text-white bg-transparent py-1.5 px-3"
      >
        <option value="default" disabled className="bg-slate-800"></option>

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
    </div>
  );
}
