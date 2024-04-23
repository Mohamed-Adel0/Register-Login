import React, { useState } from "react";
import Css from "./Login.module.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Login = () => {
  const [TakeValue, SetTakeValue] = useState({
    email: "",
    passowrd: "",
    type: "users",
  });
  const [ErrorMail, SetErrorMail] = useState(false);
  const [ErrorPass, SetErrorPass] = useState(false, "");
  const ValidationLogin = async (TakeValue) => {
    try {
      await axios
        .post("https://apis-8gnd.onrender.com/login", TakeValue)
        .then((e) => {
          if (e.data.data == null) {
            toast.error(e.data.error);
            if (e.data.error === "Email is not Encrypted") {
              SetErrorMail("Email is not Encrypted");
            }
            if (e.data.error === "Passowrd Wrong") {
              SetErrorPass("Passowrd Wrong");
            }
          } else {
            toast.success(e.data.msg);
            SetErrorPass("");
            SetErrorMail("");
            // setClosed(true);
          }
          if (e.data.data[0].type === "Admin") {
            localStorage.setItem("token", JSON.stringify(e.data.data[0].token));
            localStorage.setItem(
              "username",
              JSON.stringify(e.data.data[0].username)
            );
            localStorage.setItem("type", JSON.stringify(e.data.data[0].type));
          } else {
            setTimeout(() => {
              window.location.pathname="/"
              localStorage.setItem("type", TakeValue.type);
              localStorage.setItem("id", JSON.stringify(e.data.data[0].id));
              localStorage.setItem(
                "username",
                JSON.stringify(e.data.data[0].username)
              );
            }, 600);
          }
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const CheckEmail = /^[a-zA-Z]{3,15}[0-9]{0,4}@(hotmail|yahoo|gmail).com$/g;
    const CheckPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (CheckEmail.test(TakeValue.email)) {
      SetErrorMail(false);
      if (CheckPassword.test(TakeValue.passowrd)) {
        ValidationLogin(TakeValue);
        SetErrorPass(false);
      } else {
        toast.error("Password is not valid");
        SetErrorPass(true);
        SetErrorPass("Passowrd Wrong");
      }
    } else {
      SetErrorMail(true);
      SetErrorMail("Email is not Valid");
      toast.error("Email is not valid");
    }
  };
  const handleChange = (e) => {
    const Validation = { ...TakeValue };
    Validation[e.target.name] = e.target.value;
    SetTakeValue({ ...Validation });
  };
  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.container}>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className={Css.input}>
              <div className={Css.inputs}>
                <input
                  className={`${ErrorMail ? "border" : ""}`}
                  type="email"
                  id="mail"
                  placeholder="Email"
                  required
                  name="email"
                  onChange={handleChange}
                />
                <label htmlFor="mail">
                  <IoMdMail />
                </label>
              </div>
              <div className={Css.text}>
                <p className={`${Css.errors} ${ErrorMail ? "show" : "hide"}`}>
                  Email is not Valid{" "}
                </p>
              </div>
            </div>
            <div className={Css.input}>
              <div className={Css.inputs}>
                <input
                  className={`${ErrorPass ? "border" : ""}`}
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="passowrd"
                  onChange={handleChange}
                />
                <label htmlFor="password">
                  <RiLockPasswordFill />
                </label>
              </div>
              <div className={Css.text}>
                <p className={`${Css.errors} ${ErrorPass ? "show" : "hide"}`}>
                  {ErrorPass}
                </p>
              </div>
            </div>
            <div className={Css.remember}>
              <label htmlFor="remember">
                <input type="radio" id="remember" /> Remember Me
              </label>
              <Link to="">Forgot Password?</Link>
            </div>
            <div className={Css.buttons}>
              <button>Sign In</button>
              <p>
                Don't have an account?<Link to="register"> Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
