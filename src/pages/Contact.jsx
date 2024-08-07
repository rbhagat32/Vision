import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../utils/axios";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {}, []);

  const sendData = (data) => {
    console.log(data);
  };

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="p-10 flex flex-col gap-10 items-center rounded-xl border border-zinc-600 hover:border-zinc-400 duration-300 ease-in-out">
        <h1 className="text-5xl">Contact Us</h1>
        <form
          onSubmit={handleSubmit(sendData)}
          className="w-80 flex flex-col gap-4"
        >
          <input
            {...register("Name")}
            required
            type="text"
            placeholder="Name :"
            className="outline-none px-4 py-2 rounded-lg border border-white bg-zinc-800 placeholder:text-white"
          />
          <input
            {...register("Email")}
            required
            type="email"
            placeholder="Email :"
            className="outline-none px-4 py-2 rounded-lg border border-white bg-zinc-800 placeholder:text-white"
          />
          <textarea
            {...register("Message")}
            required
            type="text"
            placeholder="Message :"
            className="min-h-20 max-h-40 outline-none px-4 py-2 rounded-lg border border-white bg-zinc-800 placeholder:text-white"
          ></textarea>
          <input
            type="submit"
            value="Submit"
            className="px-4 py-3 border border-rose-400 hover:border-transparent hover:bg-rose-400 rounded-lg font-semibold cursor-pointer shadow-md shadow-rose-400 duration-200 ease-in-out"
          />
        </form>
      </div>
    </div>
  );
}
