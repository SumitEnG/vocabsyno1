import axios from "axios";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [passType, setPassType] = useState("password");
  const [cPassType, setCPassType] = useState("password");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [isError, setIsError] = useState("false");
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setCShowPass] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`${SERVER_URL}/api/register`, {
        firstName: fName,
        lastName: lName,
        email: mail,
        password: pass,
        cPassword: cPass,
      })
      .then(() => {
        console.log("registered");
        setIsRegistered(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setSignUpError(err.response.data);
        setIsError(true);
      });
  }

  return (
    <div className="container bg-emerald-600 h-screen w-screen flex justify-center items-center">
      <div className="mid-container bg-slate-200 h-auto rounded-md shadow-2xl ">
        <div className=" flex flex-col  justify-center items-center justify-evenly h-full">
          <input
            type="text"
            name="firstName"
            className={`rounded-md shadow-lg p-2 m-4 md:w-auto border ${
              isError && signUpError.includes("firstName")
                ? "border-red-600"
                : "border-black"
            } `}
            placeholder="First Name"
            onChange={(e) => setFName(e.target.value)}
          />
          {isError && signUpError.includes("firstName") ? (
            <div className="fNameError text-red-600">{signUpError}</div>
          ) : (
            <></>
          )}
          <input
            type="text"
            name="lastName"
            className={`rounded-md shadow-lg p-2 m-4  md:w-auto border ${
              isError && signUpError.includes("lastName")
                ? "border-red-600"
                : "border-black"
            } `}
            placeholder="Last Name"
            onChange={(e) => setLName(e.target.value)}
          />
          {isError && signUpError.includes("lastName") ? (
            <div className="lNameError text-red-600">{signUpError}</div>
          ) : (
            <></>
          )}
          <input
            type="text"
            name="email"
            className={`rounded-md shadow-lg p-2 m-4 border md:w-auto ${
              isError && signUpError.includes("email")
                ? "border-red-600"
                : "border-black"
            } `}
            placeholder="E-mail"
            onChange={(e) => setMail(e.target.value)}
          />
          {isError && signUpError.includes("email") ? (
            <div className="eMailError text-red-600">{signUpError}</div>
          ) : (
            <></>
          )}
          <div className="password ml-10">
            <input
              type={passType}
              name="password"
              className={`rounded-md shadow-lg p-2 m-4 md:w-auto border ${
                isError && signUpError.includes("password")
                  ? "border-red-600"
                  : "border-black"
              } `}
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
            <IconButton
              onClick={() => {
                setShowPass(!showPass);
                setPassType(!showPass ? "text" : "password");
              }}
            >
              {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </div>

          {isError && signUpError.includes("password") ? (
            <div className="passError text-red-600">{signUpError}</div>
          ) : (
            <></>
          )}
          <div className="cPassword ml-10">
            <input
              type={cPassType}
              name="cPassword"
              className={`rounded-md shadow-lg p-2 m-4 md:w-auto border ${
                isError &&
                (signUpError.includes("confirm-password") ||
                  signUpError.includes("cPassword"))
                  ? "border-red-600"
                  : "border-black"
              } `}
              placeholder="confirm-Password"
              onChange={(e) => setCPass(e.target.value)}
            />
            <IconButton
              onClick={() => {
                setCShowPass(!showCPass);
                setCPassType(!showCPass ? "text" : "password");
              }}
            >
              {showCPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </div>

          {isError &&
          (signUpError.includes("confirm-password") ||
            signUpError.includes("cPassword")) ? (
            <div className="cPassError text-red-600">{signUpError}</div>
          ) : (
            <></>
          )}
          <div className="text-blue-700">
            Already have an account ?{" "}
            <span
              className="font-bold hover:cursor-pointer"
              onClick={() => navigate("/sign-in")}
            >
              click here
            </span>
          </div>
          <button
            type="submit"
            className="bg-green-600 px-16 rounded-md shadow-lg text-white my-4 md:p-2  md:w-auto md:m-4"
            style={{ border: "1px double black" }}
            onClick={(e) => handleSubmit(e)}
          >
            sign-up
          </button>
          {isRegistered ? (
            <div className="text-green-700 flex flex-col justify-center items-center">
              <div>Registered successfully</div>
              <button
                className="bg-green-600 px-16 rounded-md shadow-lgc text-white my-4 p-2 md:m-4"
                onClick={() => navigate("/sign-in")}
              >
                Go to login page
              </button>
            </div>
          ) : (
            <></>
          )}
          {signUpError.indexOf("firstName") === -1 &&
          signUpError.indexOf("lastName") === -1 &&
          signUpError.indexOf("email") === -1 &&
          signUpError.indexOf("password") === -1 &&
          signUpError.indexOf("cPassword") === -1 ? (
            <div className="eMailError text-red-600">{signUpError}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
