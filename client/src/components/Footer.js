import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <div className="h-[30vh] bg-[#2d2d2d] flex justify-center items-center">
        <div className="flex flex-row gap-8 justify-center items-center">
          <h1 className="text-white font-medium text-2xl capitalize">
            stay connected
          </h1>
          <div className="flex flex-row gap-2">
            <input
              type="email"
              className="px-3 w-[15rem] bg-[#2d2d2d] border-2 border-[#d0b48f] outline-none placeholder:capitalize text-[#ececec]"
              placeholder="email"
            />
            <button className="px-4 py-2 capitalize bg-[#d0b48f] text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-[#d0b48f] border-2 border-[#d0b48f] ">
              subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="h-[40vh] bg-[#ececec] px-[20%] grid grid-cols-3 text-[#2d2d2d]">
        <div className="flex flex-col gap-2 justify-center items-center  px-5">
          <a href={"/"}>
            <p className="uppercase">home</p>
          </a>
          <a href={"#benifit"}>
            <p className="uppercase ">benifits</p>
          </a>
          <a href={"#review"}>
            <p className="uppercase ">reviews</p>
          </a>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center  px-5">
          <a href={"/"}>
            <p className="uppercase ">shipping & returns</p>
          </a>
          <a href={"#benifit"}>
            <p className="uppercase ">payment methods</p>
          </a>
          <a href={"#review"}>
            <p className="uppercase ">FAQ</p>
          </a>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center  px-5">
          <a href={"/"}>
            <p className="uppercase ">instagram</p>
          </a>
          <a href={"#benifit"}>
            <p className="uppercase ">youtube</p>
          </a>
          <a href={"#review"}>
            <p className="uppercase ">twitter</p>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Footer;
