import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [passType, setPassType] = useState("password");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [isError, setIsError] = useState("false");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  console.log(SERVER_URL);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axios.post(`${SERVER_URL}/api/auth`, {
        email: mail,
        password: pass,
      });

      console.log("logged-in", result.data);
      localStorage.setItem("token", result.data);
      navigate("/sign-in/dashboard");
    } catch (ex) {
      console.log(ex.response.data);
      setSignUpError(ex.response.data);
      setIsError(true);
    }
    console.log("useEffect");

    axios
      .get("http://localhost:3001/api/auth/me", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container bg-emerald-600 h-screen w-screen flex justify-center items-center">
      <div className="mid-container bg-slate-200 h-auto rounded-md shadow-2xl ">
        <div className=" flex flex-col  justify-center items-center justify-evenly h-full">
          <input
            type="text"
            name="email"
            className={`rounded-md shadow-lg p-2 m-4 border ${
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
              className={`rounded-md shadow-lg p-2 md:w-auto border ${
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
          <div className="text-blue-700">
            Not have an account ?{" "}
            <span
              className="font-bold hover:cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              click here
            </span>
          </div>
          <button
            type="submit"
            className="bg-green-600 px-16 rounded-md shadow-lgc text-white my-4 p-2 md:m-4"
            style={{ border: "1px double black" }}
            onClick={(e) => handleSubmit(e)}
          >
            sign-in
          </button>
          {signUpError.indexOf("email") === -1 &&
          signUpError.indexOf("password") === -1 ? (
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
