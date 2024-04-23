import React, { useState } from "react";
import Css from "./Register.module.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const [ChangeValue, SetChangeValue] = useState({
    //Hna b5azan el Value elly rag3ly mn el Input
    username: "",
    email: "",
    passowrd: "",
    passowrdReapet: "",
  });
  const Path = useNavigate()
  const [allarmEmail, SetAllarmEmail] = useState(false);
  const [Accpet, SetAccpet] = useState(false);
  const URLRegister = async (ValueInput) => {
    //ValueInput da loop rag3ly mn function submit gowaha State elly shayala el Data
    try {
      await axios
        .post("https://apis-8gnd.onrender.com/register", ValueInput)
        .then((e) => {
          if (e.data.msg !== undefined) {
            toast.success(e.data.msg); // hna b2olo low el Data da5la sa7 tal3 alarm SuccessFully
            setTimeout(() => {}, 800);
          }
          if (e.data.error !== null) {
            toast.error(e.data.error); //da fe 7alt low el data mogoda tatl3 Error eza kan email aw Passowrd mogod
          }
        });
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const CheckEmail = /^[a-zA-Z]{3,15}[0-9]{0,4}@(hotmail|yahoo|gmail).com$/g;
    const CheckUserName = /^[A-Z][a-z]{3,10}$/;
    const CheckPassowrd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (CheckUserName.test(ChangeValue.username)) {
      if (CheckEmail.test(ChangeValue.email)) {
        SetAllarmEmail(false);
        if (CheckPassowrd.test(ChangeValue.passowrd)) {
          URLRegister(ChangeValue); // hna ktabt ChangeValue 3shan el data rag3 mn 5lelha f b3tha Paramtar ly Axios
          Path("/")
          SetAccpet(true);
        } else {
          SetAccpet(false);
          // toast(
          //   "Password Must include at least one Lowercase letter, one Uppercase letter, one Digit, one Special Character, and be at least 6 Characters long",
          //   {
          //     duration: 5000,
          //   }
          // );
        }
      } else {
        SetAllarmEmail(true);
        // toast(
        //   "Please write it. E-mail.- Right. e-mail that contains the words yahoo or gmail or hotmail.",
        //   {
        //     duration: 5000,
        //   }
        // );
      }
    } else {
      // toast(
      //   "Username Must Contain Not More than 8 Characters ,Start With Characters and end with Numbers",
      //   {
      //     duration: 5000,
      //   }
      // );
    }
    SetAccpet(true);
  };
  const handleChange = (e) => {
    const UpdateData = { ...ChangeValue };
    UpdateData[e.target.name] = e.target.value;
    SetChangeValue({ ...UpdateData });
  };

  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.container}>
          <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            {/* Here for Frist Input UserName */}
            <div className={Css.input}>
              <div className={Css.inputs}>
                <input
                  type="text"
                  id="username"
                  placeholder="UserName"
                  name="username"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="username">
                  <FaUserGraduate />
                </label>
              </div>
              <div className={Css.text}>
                {ChangeValue.username[0] ===
                  ChangeValue.username.charAt(0).toLowerCase() &&
                  Accpet && (
                    <p className={Css.errors}>
                      You must write a capital letter at the beginning of your
                      name
                    </p>
                  )}
              </div>
            </div>
            {/* Here for 2nd Input Email */}
            <div className={Css.input}>
              <div className={Css.inputs}>
                <input
                  type="email"
                  id="mail"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="mail">
                  <IoMdMail />
                </label>
              </div>
              <div className={Css.text}>
                <p className={`${Css.errors} ${allarmEmail ? "show" : "hide"}`}>
                  You have to write the correct email
                </p>
              </div>
            </div>
            {/* Here for 3rd Input Password */}
            <div className={Css.input}>
              <div className={Css.inputs}>
                <input
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
                {ChangeValue.passowrd.length < 8 && Accpet && (
                  <p className={Css.errors}>
                    It must contain in the last number a capital and lowercase
                    letter
                  </p>
                )}
              </div>
            </div>
            {/* Here for 4th Input Reapet Passowrd */}
            <div className={Css.input}>
              <div className={Css.inputs}>
                <input
                  type="password"
                  id="RePassword"
                  placeholder="Reapet Password"
                  name="passowrdReapet"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="RePassword">
                  <RiLockPasswordFill />
                </label>
              </div>
              <div className={Css.text}>
                {ChangeValue.passowrdReapet !== ChangeValue.passowrd &&
                  Accpet && (
                    <p className={Css.errors}>Passowrd Does Not Match</p>
                  )}
              </div>
            </div>
            {/* Here for Button to Send Data to DataBase */}
            <div className={Css.buttons}>
              <button>Sign In</button>
              <p>
                Already have an account?<Link to="/"> Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
