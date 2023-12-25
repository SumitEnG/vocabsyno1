import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import Flashcard from "../utils/flashcard";
import axios from "axios";

function MyList() {
  const [modal, setModal] = useState(false);
  const [vocab, setVocab] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [readVocab, setReadVocab] = useState("");
  const [meaning, setMeaning] = useState("");

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    axios
      .get(`${SERVER_URL}/api/flashcard/${currentUser._id}`)
      .then((res) => {
        setVocab(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  });

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

  function handleCloseModal() {
    setModal(false);
  }

  function handlePostVocab() {
    axios
      .post("http://localhost:3001/api/flashcard", {
        vocab: readVocab,
        meaning: meaning,
        userId: currentUser._id,
      })
      .then((res) => {
        toast("added successfully");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("added");
      });
    setModal(false);
    setReadVocab("");
    setMeaning("");
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
      <div
        className="main mt-2 hover:text-cyan-500 hover:cursor-pointer text-center text-white text-lg md:text-md lg:text-lg font-bold"
        onClick={() => setModal(true)}
      >
        Add your's
      </div>

      <div className=" flex justify-around flex-wrap">
        {vocab.map((v) => (
          <Flashcard vocab={v.vocab} meaning={v.meaning} />
        ))}
      </div>

      <Modal
        open={modal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="gap-4 h-auto flex flex-col">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add your's Vocabulary
            </Typography>
            <TextField
              id="outlined-basic"
              label="Vocabuary"
              variant="outlined"
              onChange={(e) => setReadVocab(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Meaning"
              variant="outlined"
              onChange={(e) => setMeaning(e.target.value)}
            />
            <Button onClick={handlePostVocab}>Submit</Button>
          </div>
          <Toaster />
        </Box>
      </Modal>
    </div>
  );
}

export default MyList;
