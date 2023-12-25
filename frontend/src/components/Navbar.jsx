import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { getCookie } from "../lib/cookieGetterSetter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  // const { ready, user, setUser } = useContext(UserContext);
  // console.log(ready, user, setUser, "hereisit");
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchdata = async () => {
        const cookie = getCookie("storedAuthtoken");

        const { data } = await axios.get(`/profile`, {
          headers: {
            "auth-token": cookie,
          },
        });

        setReady(true);
        setUser(data.user.name);
        // console.log(user);
      };
      fetchdata();
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  const logout = async () => {
    try {
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="relative flex pl-10 pr-10 justify-between items-center bg-blue-900 h-14 ">
      <div className=" relative flex w-72 size ">
        <CiSearch className="absolute text-3xl cursor-pointer pl-1" />
        <input
          type="text"
          placeholder="Search"
          className="  bg-neutral-100 rounded w-72 h-8 pl-8"
        />
      </div>

      <div className="flex items-center justify-between space-x-20">
        {user ? (
          <>
            <div>{user}</div>
            <RxAvatar />

            <p className="cursor-pointer" onClick={logout}>
              logout
            </p>
          </>
        ) : (
          <div>
            <Link className="underline text-black" to={"/register"}>
              Create Account
            </Link>
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
