import React, { useEffect, useState } from "react";
import Css from "./DesginLogin.module.css";
import { Link, Outlet } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import "animate.css";
const DesginLogin = () => {
  const [Closed, setClosed] = useState(false);
  const [GetName, SetName] = useState("");
  useEffect(() => {
    const Display = () => {
      if (localStorage.getItem("username") !== null) {
        SetName(JSON.parse(localStorage.getItem("username")));
        setClosed(true);
      } else {
        setClosed(false);
      }
    };
    Display();
  }, []);
  const Remove = () => {
    localStorage.removeItem("username");
    setClosed(false);
  };
  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.bg}></div>
        <div className={Css.container}>
          <div className={`${Css.profile} ${Closed ? Css.top : ""}`}>
            <div
              className={`${Css.bar} animate__animated animate__bounce animate__slower animate__infinite animate__swing`}
            >
              <p>
                <IoIosArrowDown />
              </p>
            </div>
            <div className={Css.info}>
              <div className={Css.text}>
                <h2 className="animate__animated animate__bounce animate__slower animate__infinite animate__swing">
                  Welcome {GetName}
                </h2>
                <button onClick={Remove}>
                  <IoIosLogOut />
                </button>
              </div>
            </div>
          </div>
          <div className={Css.cards}>
            <div className={Css.card}>
              <h2>
                Code<span>Mo</span>
              </h2>
              <div className={Css.detalis}>
                <h1>Welcome!</h1>
                <h3>To Our New Website.</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate deserunt eveniet, cumque quaerat amet saepe.
                </p>
                <div className={Css.icons}>
                  <Link to="https://www.facebook.com/profile.php?id=100012706116123">
                    <FaFacebookF />
                  </Link>
                  <Link to="https://www.linkedin.com/in/mohamed-adel-226611286/">
                    <FaLinkedinIn />
                  </Link>
                  <Link to="https://github.com/Mohamed-Adel0">
                    <FaGithub />
                  </Link>
                </div>
              </div>
            </div>
            <div className={Css.card}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesginLogin;
