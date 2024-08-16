import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// new axios instance for google sheets api
import axios from "axios";
// tmdb axios instance from utils.axios for getting background image
import axiosTMDB from "../utils/axios";
import Loading from "../utils/Loading";
import Toast from "../components/Toast";

export default function Contact() {
  document.title = "Vision - Contact Us";
  const { register, handleSubmit, reset } = useForm();

  const [bg, setBg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    visible: false,
    success: false,
    message: "",
  });

  useEffect(() => {
    setLoading(true);
    axiosTMDB
      .get("/trending/all/day")
      .then((res) => {
        const results = res.data.results;
        const randomIndex = Math.floor(Math.random() * results.length);
        setBg(results[randomIndex]);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendData = (data) => {
    setLoading(true);
    axios
      .post("/sheets-api", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        reset();
        setLoading(false);
        setToast({
          visible: true,
          success: true,
          message: "Thanks for contacting us!",
        });
      })
      .catch((error) => {
        setToast({
          visible: true,
          success: false,
          message: "Some error occurred!",
        });
        console.log(error);
      });
  };

  return loading ? (
    <Loading height="h-screen" size="size-14" />
  ) : (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8),rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${bg?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen grid place-items-center"
    >
      {toast.visible && (
        <Toast // unique key to allow re-render of toast when button is clicked again
          key={new Date().getTime()}
          success={toast.success}
          message={toast.message}
        />
      )}

      <div className="glass p-10 flex flex-col gap-10 items-center rounded-xl border border-zinc-600 hover:border-zinc-400 duration-300 ease-in-out">
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
