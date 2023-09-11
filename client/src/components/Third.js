import { Link } from "react-router-dom";

function Third() {
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2 h-[50vh] px-[15%] bg-[#ececec]">
        <div className="flex justify-center items-center capitalize text-xl">
          <p>as featured on:</p>
        </div>
        <div className="flex justify-center items-center capitalize text-xl">
          <p className="px-3 py-3 border-2 border-[#b0b0b0] text-[#b0b0b0] text-4xl font-bold uppercase origin-center rotate-3">
            tune
          </p>
        </div>
        <div className="flex justify-center items-center capitalize text-xl">
          <p className="px-3 py-3 border-2 border-[#b0b0b0] text-[#b0b0b0] text-4xl font-bold uppercase origin-center -rotate-3">
            eastflow
          </p>
        </div>
        <div className="flex justify-center items-center capitalize text-xl">
          <p className="px-3 py-3 border-2 border-[#b0b0b0] text-[#b0b0b0] text-4xl font-bold uppercase origin-center rotate-3">
            Rock CK
          </p>
        </div>
        <div className="flex justify-center items-center capitalize text-xl">
          <p className="px-3 py-3 border-2 border-[#b0b0b0] text-[#b0b0b0] text-4xl font-bold uppercase origin-center -rotate-3">
            instrumental
          </p>
        </div>
        <div className="flex justify-center items-center capitalize text-xl">
          <p className="px-3 py-3 border-2 border-[#b0b0b0] text-[#b0b0b0] text-4xl font-bold uppercase origin-center rotate-3">
            wave
          </p>
        </div>
      </div>
      <div className="px-[10%] py-[5%] h-[80vh] bg-[#E3CBAA] grid grid-cols-2 hhhh">
        <div></div>
        <div className="px-2 py-2 flex justify-start items-center flex-col">
          <h1 className="capitalize tracking-wide text-[3rem] text-start leading-[3rem] mb-4 text-white">
            music like you've never heard before
          </h1>
          <p className="font-light tracking-wide text-lg text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet rem
            iste recusandae officiis expedita iusto fugit eius! Temporibus,
            quidem minus.
          </p>
          <Link to={"/shop"}>
            <button className="px-8 py-3 border-2 capitalize text-white mt-10 hover:bg-white hover:text-[#e3cbaa]">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Third;
