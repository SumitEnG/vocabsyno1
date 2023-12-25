import { Button } from "@mui/material";
import React from "react";
import image from "../assets/read.jpg";
import image2 from "../assets/quiz-removebg-preview.png";
import image3 from "../assets/vocab-removebg-preview.png";
import image4 from "../assets/download-removebg-preview.png";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="container h-auto  md:h-screen w-screen ">
      <div className="upperContainer pb-6 md:pb-0  h-2/3 bg-emerald-600 ">
        <div className="contact flex justify-between">
          <a className=" mt-2 mx-2  text-sm text-white italic md:mx-12 md:text-base lg:mx-24 lg:text-xl">
            contact us
          </a>
          <div className="h-24 sign flex flex-col justify-around md:flex-row  md:h-auto md:w-60 md:justify-between md:pt-4 mx-2 md:mx-12 lg:mx-24">
            <Button
              variant="contained"
              color="success"
              className="shadow-lg"
              onClick={() => navigate("/sign-in")}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              color="success"
              className="shadow-lg"
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </Button>
          </div>
        </div>

        <h3 className="text-white mx-2 md:mx-12 lg:mx-24 font-bold md:text-lg lg:text-2xl md:mt-10">
          Learn Vocabulary Online
        </h3>
        <div className="h-2 mt-2 bg-white shadow-2xl mx-2 md:mx-12 lg:mx-24 rounded-md"></div>
        <div className="mt-10 mx-4 md:mx-12 lg:mx-24 flex flex-col md:flex-row justify-between">
          <div className="img w-72 ">
            <img src={image} alt="" className="rounded-sm" />
          </div>
          <div>
            <div className="text-white font-extrabold w-72 text-2xl lg:text-3xl mt-4">
              Take online quizes and practive daily Vocabulary, Spend 30 minutes
              a day.
            </div>
            <div className="mt-2">
              {" "}
              <Button
                variant="contained"
                color="success"
                className="shadow-lg"
                onClick={() => navigate("/sign-up")}
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="lowerContainer h-1/3 bg-slate-200 p-4 md:px-12 lg:px-24 flex flex-col md:flex-row justify-center items-center justify-between">
        <div className="w-20 md:w-auto">
          <img src={image2} alt="" />
        </div>
        <div className="w-28 md:w-auto">
          <img src={image3} alt="" />
        </div>
        <div className="w-28 md:w-auto">
          <img src={image4} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
