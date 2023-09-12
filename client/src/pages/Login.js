import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Auth/firebase";
function Login() {
  const [credentials, setCredentials] = useState({
    email: String,
    pass: String,
  });
  const nav = useNavigate();
  const provider = new GoogleAuthProvider();
  const lUser = () => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.pass)
      .then(async (res) => {
        console.log(res);
        nav("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const glogin = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const c = GoogleAuthProvider.credentialFromResult(res);
        console.log(c);
        const user = res.user;
        console.log(user);
        nav("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="w-full flex justify-center items-center h-[100vh]">
      <div className="gap-2 h-[80vh] w-[80vw] px-5 py-5 rounded-md grid grid-cols-2 bg-[#3d3d3d]">
        <div className="w-full h-full relative">
          <img
            src="https://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="w-full h-full absolute object-cover"
              loading="lazy"
          />
        </div>
        <div className="px-20 py-10 flex flex-col gap-5 ">
          <h1 className="text-white text-3xl capitalize">login to soundbeam</h1>
          <div className="flex flex-col gap-3 mb-5">
            <input
              type="email"
              placeholder="email"
              onChange={(e) => {
                setCredentials((prev) => ({ ...prev, email: e.target.value }));
              }}
              className="px-3 py-2 rounded-sm placeholder:capitalize outline-none"
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setCredentials((prev) => ({ ...prev, pass: e.target.value }));
              }}
              className="px-3 py-2 rounded-sm placeholder:capitalize outline-none"
            />
          </div>
          <button
            onClick={() => {
              lUser();
            }}
            className="bg-[#d0b48f] py-2"
          >
            Sign Up
          </button>
          <div className="flex justify-between items-center mt-[-.5rem]">
            <Link to={"/login"}>
              <p className="cursor-pointer underline text-white ">
                Forgot password?
              </p>
            </Link>
          </div>
          <button
            className="mt-10 py-2 bg-[#d0b48f] capitalize"
            onClick={() => {
              glogin();
            }}
          >
            continue with google
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
