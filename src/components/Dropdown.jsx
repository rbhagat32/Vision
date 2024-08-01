import React from "react";
import { capitalize } from "../utils/capitalize";

export default function Dropdown({ options }) {
  return (
    <select className="block outline-none border border-white rounded-md text-white placeholder:text-white bg-transparent py-1.5 px-3">
      {options.map((option, i) => (
        <option key={i} value={option.value} className="bg-zinc-800">
          {capitalize(option)}
        </option>
      ))}
    </select>
  );
}
