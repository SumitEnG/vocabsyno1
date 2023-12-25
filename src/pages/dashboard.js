import React, { useEffect, useState } from "react";
import Flashcard from "../utils/flashcard";
import axios from "axios";
import { Box, Button, Modal, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Logout } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [vocab, setVocab] = useState([]);
  const [isMenu, setIsMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const [showSubService, setShowSubService] = useState(false);
  const navigate = useNavigate();

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function handleClosePopup() {
    setPopup(false);
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    axios
      .get(`${SERVER_URL}/api/flashcard`)
      .then((res) => {
        setVocab(res.data);
      })
      .catch((err) => console.log(err.response.data));
  });
  return (
    <div className="container h-screen bg-emerald-600 overflow-auto w-screen font-[poppins]">
      <nav className="nav  text-white text-lg md:text-md lg:text-lg font-bold mx-2 md:mx-12 lg:mx-24 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          {localStorage.getItem("currentUser") ? (
            <div className="user py-6 text-xl">
              Welcome {currentUser.firstName}
            </div>
          ) : (
            <></>
          )}

          <div className="md:hidden">
            <div
              className={`${isMenu ? "hidden" : "visible"}`}
              onClick={() => setIsMenu(true)}
            >
              <MenuIcon />
            </div>
            <div
              className={`${isMenu ? "visible" : "hidden"}`}
              onClick={() => setIsMenu(false)}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <ul
          className={`${
            isMenu ? "visible" : "hidden"
          } md:flex md:flex-row items-center md:justify-end md:gap-7 lg:gap-10 flex flex-col  bg-slate-200 md:bg-emerald-600 text-black md:text-white transition-all ease-linear duration-500`}
        >
          <li className="my-2">
            <div className="hover:text-cyan-500 hover:cursor-pointer">HOME</div>
          </li>
          <li className="my-2">
            <div className="hover:text-cyan-500 hover:cursor-pointer">
              ABOUT
            </div>
          </li>
          <li className="my-2">
            <div>
              <div
                className={`hover:text-cyan-500 hover:cursor-pointer ${
                  showSubService ? "md:bg-gray-50 md:text-black " : ""
                }`}
                onClick={() => setShowSubService(!showSubService)}
              >
                {" "}
                SERVICE
                {showSubService ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
              </div>
              <div className="sub-service text-center z-50 md:absolute bg-slate-200 md:w-[103px] md:bg-gray-50 md:text-black w-auto">
                {showSubService ? (
                  <div>
                    <div
                      className="hover:text-cyan-500 hover:cursor-pointer"
                      onClick={() => navigate("/sign-in/dashboard/my-list")}
                    >
                      My List
                    </div>
                    <div
                      className="hover:text-cyan-500 hover:cursor-pointer"
                      onClick={() => navigate("/sign-in/dashboard/ai")}
                    >
                      AI
                    </div>
                    <div
                      className="hover:text-cyan-500 hover:cursor-pointer"
                      onClick={() => navigate("/sign-in/dashboard/quiz")}
                    >
                      quiz
                    </div>
                    <div className="hover:text-cyan-500 hover:cursor-pointer">
                      progress
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </li>
          <li className="my-2">
            <a
              href="https://www.instagram.com/sumitsahu8176/"
              target="_blank"
              className="hover:text-cyan-500"
            >
              CONTACT
            </a>
          </li>
          <li className="my-2 mb-2" onClick={() => setPopup(true)}>
            <div className="hover:text-cyan-500 hover:cursor-pointer">
              <Logout />
            </div>
          </li>
        </ul>
      </nav>
      <div className="h-2 mt-4 bg-white shadow-2xl mx-2 md:mx-12 lg:mx-24 rounded-md"></div>

      <div className=" flex justify-around flex-wrap">
        {vocab.map((v) => (
          <Flashcard vocab={v.vocab} meaning={v.meaning} />
        ))}
      </div>

      <Modal
        open={popup}
        onClose={handleClosePopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you want to log out
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => localStorage.clear()}
          >
            Log Out
          </Button>
          <Button
            variant="outlined"
            onClick={() => setPopup(false)}
            sx={{ ml: "10px" }}
          >
            Cencel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export default Dashboard;
