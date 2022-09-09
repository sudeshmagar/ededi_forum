import React, { useContext, useState, useEffect } from "react";
import Signup_img from "../assets/images/team.svg";
import { UserIcon, KeyIcon } from "@heroicons/react/outline";
import { GlobalContext } from "./../context/Provider";
import { userSignup } from "./../context/actions/auth.action";
import { useNavigate } from "react-router-dom";
function SignUp() {
  let navigate = useNavigate();
  const { loginDispatch, loginState } = useContext(GlobalContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    userSignup({ username, email, password })(loginDispatch);
  };
  console.log(loginState);

  useEffect(() => {
    if (loginState.register) {
      loginState.register = false;
      return navigate("/");
    }
  }, [loginState.register]);
  return (
    <div className="wrapper flex w-full">
      <div className="left w-1/2 h-screen bg-slate-100 flex flex-col  content-center items-center justify-evenly">
        <h1 className="font-bold text-4xl">
          Join the Awesome Community Today.
        </h1>
        <img src={Signup_img} alt="illustration" className="w-1/2" />
      </div>
      <div className="right w-1/2 h-screen bg-slate-700 flex justify-center items-center">
        <div className="card flex items-center w-1/2 rounded-2xl  p-20 bg-slate-100 justify-center">
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative mb-5">
              <input
                type="text"
                id="user"
                name="user"
                placeholder="Email or Username"
                className="w-full peer px-4 py-2 rounded-full border border-slate-300  placeholder-transparent dark:bg-slate-800"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label
                htmlFor="user"
                className="absolute flex items-center left-[15px] text-xs text-gray-500 top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
              >
                <UserIcon className="h-4 w-4 inline-flex" /> Username
              </label>
            </div>
            <div className="relative mb-5">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email Address"
                className="w-full peer px-4 py-2 rounded-full border border-slate-300  placeholder-transparent dark:bg-slate-800"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute flex items-center left-[15px] text-xs text-gray-500 top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
              >
                <UserIcon className="h-4 w-4 inline-flex" /> Email
              </label>
            </div>
            <div className="relative mb-5">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full peer px-4 py-2 rounded-full border border-slate-300  placeholder-transparent dark:bg-slate-800"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className="absolute flex items-center left-[15px] text-xs text-gray-500 top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
              >
                <KeyIcon className="h-4 w-4 inline-flex" /> Password
              </label>
            </div>
            <button
              type="submit"
              className="mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-full px4 py-2 rounded-full border-none "
              onClick={onSubmit}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
