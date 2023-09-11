import {
  Headphones,
  Instagram,
  ShoppingBagIcon,
  Twitter,
  Youtube,
} from "lucide-react";

import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useRef } from "react";

const btns = [
  { link: "/", t: "home" },
  { link: "/#benifit", t: "benifits" },
  { link: "/#review", t: "review" },
];
const social = [
  { link: "", icon: <Instagram size={20} color="white" /> },
  { link: "", icon: <Youtube size={20} color="white" /> },
  { link: "", icon: <Twitter size={20} color="white" /> },
];
function Nav() {
  const r = useRef();
  const showCart = () => {
    console.log(r.current);
    r.current.style.width = "22vw";
  };
  return (
    <>
      <div className="flex flex-row items-center justify-between px-4 py-5 mx-3 text-white bg-transparent border-b-2 border-white">
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-1 ">
            <Link
              to="/"
              className="flex flex-row gap-1 text-xl justify-center items-center capitalize font-[400]"
            >
              <Headphones size={24} />
              soundbeam
            </Link>
          </div>
          <div className="flex flex-row gap-2">
            {btns.map((e) => {
              const { link, t } = e;
              return (
                <a href={link}>
                  <button className="text-lg tracking-tight capitalize">
                    {t}
                  </button>
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 text-sm">
          <Link to={"/signup"}>
            <button className="capitalize px-2 py-2 text-[#d0b48f]">
              log in
            </button>
          </Link>
          <Link to={"/shop"}>
            <button className="capitalize px-2 py-2 bg-[#d0b48f] text-black">
              order now
            </button>
          </Link>
          {social.map((e) => {
            const { link, icon } = e;
            return (
              <Link to={link}>
                <button>{icon}</button>
              </Link>
            );
          })}
          <button onClick={showCart}>
            <ShoppingBagIcon size={20} color="white" />
          </button>
        </div>
      </div>
      <Cart r={r} />
    </>
  );
}
export default Nav;
