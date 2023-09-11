import { Minus, MinusIcon, Plus, PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import { products } from "../data/Data";
import load from "../assets/loader.svg";
const info = [
  {
    t: "product info",
    sub: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, tempora perferendis dolore excepturi modi debitis expedita adipisci rem? Maiores, officia",
    id: 0,
  },
  {
    t: "return & refund policy",
    sub: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, tempora perferendis dolore excepturi modi debitis expedita adipisci rem? Maiores, officia.",
    id: 1,
  },
  {
    t: "shipping info",
    sub: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, tempora perferendis dolore excepturi modi debitis expedita adipisci rem? Maiores, officia.",
    id: 2,
  },
];
function Shop() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [p, setP] = useState(products[0]);
  const [sub, setSub] = useState(p.price);
  const [qt, setQt] = useState(1);
  const [currentUser, setCurrentUser] = useState("");
  const r = useRef();
  const [showI, setShowI] = useState(Array(info.length).fill(false));
  const toggle = (index) => {
    const u = [...showI];
    u[index] = !u[index];
    // console.log(showI);
    setShowI(u);
  };
  const sendData = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const url = "https://soundbeam-server.cyclic.app/api/v1/data";
    const response = await fetch(url, options);
    try {
      if (response.ok) {
        console.log("dataSend", data);
      } else {
        console.log("failed to send");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const checkoutData = {
    price: sub * 100,
    quantity: qt,
    name: "Soundbeam ERD - 3083",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  };

  const sendCheckout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    };
    const url = "https://soundbeam-server.cyclic.app/create-checkout-session";
    const response = await fetch(url, options);
    try {
      if (response.ok) {
        console.log("success");
        const result = await response.json();
        setCheckoutLoading(false);
        window.location = result.url;
      } else {
        console.error("failed");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const fetchUser = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "https://soundbeam-server.cyclic.app/api/v1/user";
    const response = await fetch(url, options);
    try {
      if (response.ok) {
        const result = await response.json();
        setCurrentUser(result?.uid);
        console.log(currentUser);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
    setP((prev) => ({ ...prev, qty: qt }));
    setP((prev) => ({ ...prev, uid: currentUser }));
    setSub(parseFloat(p.price.replace("$", "")) * qt);
  }, [qt]);
  return (
    <>
      {checkoutLoading ? (
        <div className="fixed w-[100vw] h-[100vh] bg-[rgba(255,255,255,0.7)] flex justify-center items-center">
          <img src={load} alt="" className="h-[5vh]" />
          <p className="text-white">Please Wait</p>
        </div>
      ) : (
        <></>
      )}
      <div className="bg-[#2d2d2d] px-[15%] py-5 flex justify-center items-center h-full">
        <div className="flex flex-col w-full h-full gap-3">
          <nav className="w-full h-[5vh] px-3 py-2 flex justify-start items-center">
            <h1 className="capitalize text-[#8e8e8e] text-sm">
              <span className="text-white tracking-wide mr-[3px]">home/</span>
              {p.title}
            </h1>
          </nav>
          <div className="grid w-full grid-cols-2 gap-4 h-fit">
            <div className="flex flex-col w-full gap-2 px-10 py-3">
              <img src={p.img} alt="" />
              <div className="flex flex-row items-center justify-start gap-2">
                {products.map((e, index) => {
                  return (
                    <div
                      key={index}
                      className={` h-[3.5rem] w-[3.5rem] ${
                        index === p.id ? `border-white border-[1px]` : ``
                      }`}
                      onClick={() => {
                        setP(products[index]);
                        setQt(1);
                        setP((prev) => ({ ...prev, qty: qt }));
                        setP((prev) => ({ ...prev, uid: currentUser }));
                      }}
                    >
                      <img src={e.img} alt="" />
                    </div>
                  );
                })}
              </div>
              <p className="py-2 text-xs text-white font-extralight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus quasi eveniet at.
              </p>
            </div>
            <div className="w-full px-2 py-4 flex flex-col gap-2 text-white pr-[30%]">
              <div className="py-3">
                <h1 className="mb-1 text-2xl font-semibold">{p.title}</h1>
                <p className="font-extralight text-sm mt-[-5px] text-[]">
                  {p.sTitle}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-lg font-semibold">{p.price}</p>
              </div>
              <div className="mb-3">
                <p className="mb-1 capitalize">color : {p.cc}</p>
                <div className="flex flex-row gap-3">
                  {products.map((e, index) => {
                    return (
                      <div
                        className={`h-4 w-4 rounded-[100%] bg-${
                          e.color
                        } border-[1px] ${
                          index === p.id ? `border-blue-500` : ``
                        }`}
                        onClick={() => {
                          setP(products[index]);
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <div className="mb-3">
                <p>Quantity</p>
                <div className="flex  justify-start items-center w-fit bg-white text-black border-[1px] border-black">
                  <button
                    className="h-7 w-7 border-r-[1px] border-black flex justify-center items-center "
                    onClick={() => {
                      setQt((q) => (q - 1 > 1 ? q - 1 : 1));
                      console.log(sub);
                    }}
                  >
                    <Minus size={20} />
                  </button>
                  <p className="h-7 w-7 flex justify-center items-center text-[1rem]">
                    {p.qty}
                  </p>
                  <button
                    className="h-7 w-7 border-l-[1px] border-black flex justify-center items-center"
                    onClick={() => {
                      setQt(qt + 1);
                    }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <button
                className="py-2 w-full capitalize bg-[#d0b48f] text-black font-light "
                onClick={() => {
                  r.current.style.width = "22vw";
                  sendData(p);
                }}
              >
                order now
              </button>
              <button
                className="w-full py-2 font-light text-black capitalize bg-white"
                onClick={() => {
                  setCheckoutLoading(true);
                  sendCheckout();
                }}
              >
                buy now
              </button>
              <div className="flex flex-col w-full gap-2 mt-5">
                {info.map((e, index) => {
                  return (
                    <div className="border-b-[1px] px-3 pb-5 pt-3 transition-max-h">
                      <div className="flex flex-row justify-between items-center">
                        <h1 className="uppercase font-[200] text-[14px]">
                          {e.t}
                        </h1>
                        <button
                          onClick={() => {
                            toggle(index);
                          }}
                        >
                          {showI[index] ? (
                            <MinusIcon size={16} />
                          ) : (
                            <PlusIcon size={16} />
                          )}
                        </button>
                      </div>

                      {showI[index] && (
                        <div
                          className={`${
                            showI[index] ? `max-h-fit` : `max-h-0`
                          }`}
                        >
                          <p className="text-sm text-[#cccccc]">{e.sub}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cart r={r} />
    </>
  );
}
export default Shop;
