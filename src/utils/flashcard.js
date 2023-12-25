import React from "react";
import "./fashcard.css";

function Flashcard(props) {
  return (
    <div className="card-container h-32 w-64 m-10 rounded-md bg-slate-200 text-lg text-center">
      <div className="pt-12 front">{props.vocab}</div>
      <div className="pt-12 back">{props.meaning}</div>
    </div>
  );
}

export default Flashcard;
