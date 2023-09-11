import { Activity, Battery, Bluetooth, Headphones } from "lucide-react";

function Second() {
  return (
    <div className="hhh h-[100vh] grid grid-cols-4" id="benifit">
      <div className="flex flex-col px-20 py-5 justify-center items-center text-white border-r-[.3px] my-[3rem] border-r-[rgba(255,255,255,.3)]">
        <div className="">
          <Activity />
          <h1 className="font-bold text-3xl my-2">High Quality Sound</h1>
          <p className="font-extralight text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quis
            tempora nostrum perferendis molestias voluptate
          </p>
        </div>
      </div>
      <div className="flex flex-col px-20 py-5 justify-center items-center text-white border-r-[.3px] my-[3rem] border-r-[rgba(255,255,255,.3)]">
        <div className="mt-[-17rem]">
          <Bluetooth />
          <h1 className="font-bold text-3xl my-2">Easy Wireless Listening</h1>
          <p className="font-extralight text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            temporibus dolorum commodi.
          </p>
        </div>
      </div>
      <div className="flex flex-col px-20 py-5 justify-center items-center text-white border-r-[.3px] my-[3rem] border-r-[rgba(255,255,255,.3)]">
        <div>
          <Battery />
          <h1 className="font-bold text-3xl my-2">Longer Battery Life</h1>
          <p className="font-extralight text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Exercitationem beatae facere neque.
          </p>
        </div>
      </div>
      <div className="flex flex-col px-20 py-5 justify-center items-center text-white border-r-[.3px] my-[3rem] border-r-[rgba(255,255,255,.3)]">
        <div className="mt-[-17rem]">
          <Headphones />
          <h1 className="font-bold text-3xl my-2">Sleek Updated Design</h1>
          <p className="font-extralight text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
            et vero quo.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Second;
