import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Openai() {
  const [vocab, setVocab] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  console.log(category);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const vocabArray = vocab.split(".");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
  });

  function submitCategory() {
    axios
      .post(`${SERVER_URL}/api/chat/${category}`)
      .then((res) => {
        console.log(res.data.response.choices[0].message.content);
        setVocab(res.data.response.choices[0].message.content);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container pt-2 h-screen bg-emerald-600 overflow-auto w-screen font-[poppins]">
      <div className="upperSection text-white w-auto mx-2 md:mx-12 lg:mx-24 text-lg md:text-md lg:text-lg font-bold flex justify-between">
        <div
          className="hover:text-cyan-500 hover:cursor-pointer flex items-center"
          onClick={() => navigate("/sign-in/dashboard")}
        >
          <ArrowBack />
          <span>BACK</span>
        </div>
        <div
          className="hover:text-cyan-500 hover:cursor-pointer"
          onClick={() => navigate("/sign-in/dashboard")}
        >
          HOME
        </div>
      </div>
      <div className="h-2 mt-4 bg-white shadow-2xl mx-2 md:mx-12 lg:mx-24 rounded-md"></div>
      <div className="main mt-2  text-center text-white text-lg md:text-md lg:text-lg font-bold">
        <span>Choose category</span>
        <input
          type="text"
          name="categogy"
          className="rounded-md shadow-lg p-2 m-4 md:w-auto border border-black text-black"
          placeholder="ex:- sports"
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          className="bg-green-600 px-16 rounded-md shadow-lgc text-white my-4 p-2 md:m-4 border border-black"
          onClick={submitCategory}
        >
          search
        </button>
      </div>

      {vocab ? (
        <div className="flex flex-col justify-center p-4 bg-slate-200 text-lg ">
          <div className="my-2">{vocabArray[1]}</div>
          <div className="my-2">{vocabArray[3]}</div>
          <div className="my-2">{vocabArray[5]}</div>
          <div className="my-2">{vocabArray[7]}</div>
          <div className="my-2">{vocabArray[9]}</div>
          <div className="my-2">{vocabArray[11]}</div>
          <div className="my-2">{vocabArray[13]}</div>
          <div className="my-2">{vocabArray[15]}</div>
          <div className="my-2">{vocabArray[17]}</div>
          <div className="my-2">{vocabArray[19]}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Openai;
