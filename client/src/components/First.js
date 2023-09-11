import { Link } from "react-router-dom";
import Nav from "../components/Nav";

function First() {
  return (
    <div className="hh h-[100vh]">
      <Nav />
      <div className="flex justify-center items-center w-full h-full">
        <div className="ml-10">
          <p className="font-light tracking-wide text-lg text-white">
            Soundbeam ERD - 3083
          </p>
          <h1 className="font-medium tracking-normal text-[5rem] leading-[5.3rem] w-[60%] text-white">
            Reinventing Sound Experience
          </h1>
          <Link to={"/shop"}>
            <button className="px-8 py-3 border-2 capitalize text-white mt-10 hover:bg-white hover:text-[#665745]">
              order now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default First;
