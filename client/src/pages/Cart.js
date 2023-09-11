import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import load from "../assets/loader.svg";
import { X } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Cart() {
  const [sub, setSub] = useState(0);
  const [p, setP] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [location, setLocation] = useState("");
  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "https://soundbeam-server.cyclic.app/api/v1/data";
    const response = await fetch(url, options);
    try {
      if (response.ok) {
        const result = await response.json();
        setP(result);
        setLoading(false);
        const a = result.map((e) => parseInt(e.price.replace("$", ""), 10));
        var t = 0.0;
        result.map((e, index) => {
          t = t + a[index] * e.qty;
        });
        setSub(t);
      } else {
        console.log("failed to fetch");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const deleteData = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://soundbeam-server.cyclic.app/api/v1/data/${id}`;
    const response = await fetch(url, options);
    try {
      if (response.ok) {
        console.log("deleted");
        fetchData();
      } else {
        console.log("failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const checkoutData = {
    price: sub * 100,
    quantity: 1,
    name: "Soundbeam ERD - 3083",
    success_url: "https://soundbeam-mern.vercel.app",
    cancel_url: "https://soundbeam-mern.vercel.app/",
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
  const gl = () => {
    const sl = async (ps) => {
      console.log(ps.coords.latitude);
      console.log(ps.coords.longitude);
      const url = `https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${ps.coords.latitude}&lon=${ps.coords.longitude}&accept-language=en&polygon_threshold=0.0`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "02e52d3318mshcbbd34f72a99c0fp11ebb0jsn2a48fea42382",
          "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        const a =
          result?.address?.road +
          " , " +
          result?.address?.city +
          " , " +
          result?.address?.state;
        console.log(a);
        setLocation(a);
      } catch (error) {
        console.error(error);
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sl);
    }
  };
  useEffect(() => {
    fetchData();
  }, [p]);
  return (
    <>
      {checkoutLoading ? (
        <div className="fixed w-[100vw] h-[100vh] bg-[rgba(255,255,255,0.7)] flex justify-center items-center">
          <img src={load} alt="" className="h-[5vh]" />
          <p className="">Please Wait</p>
        </div>
      ) : (
        <></>
      )}
      <Nav />
      {loading ? (
        <div className="flex w-[100vw] justify-center items-center ">
          <div className="w-[70vw] h-[90vh] px-2 py-1 grid g2 gap-10 mt-2">
            <div className="w-full flex flex-col gap-2 px-3">
              <div className="h-[7vh] rounded-lg px-2 py-2 ">
                <div className="w-full h-full bg-[#363636] rounded-md skeleton"></div>
              </div>
              <div className="rounded-lg px-2 flex flex-col gap-2">
                {Array(5)
                  .fill(0)
                  .map((e) => {
                    return (
                      <div className="flex justify-between items-center w-full h-[15vh] rounded-md bg-[#363636] skeleton "></div>
                    );
                  })}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 px-2 h-[264.2px]  rounded-lg py-2">
              <div className="h-[40.8px] rounded-md bg-[#363636] skeleton"></div>
              <div className="h-[70%] rounded-md bg-[#363636] skeleton"></div>
              <div className="h-[20%] rounded-md bg-[#363636] skeleton"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
          <div className="w-[70vw] h-[90vh] px-2 py-1 grid g2 gap-10">
            <div className="w-full flex flex-col gap-2 px-3">
              <div className="py-2 border-b-[1px] border-b-[#ccc]">
                <h1 className="capitalize font-semibold text-white">my cart</h1>
              </div>
              {p.map((e) => {
                return (
                  <div className="py-2 border-b-[1px] border-b-[#ccc] flex justify-between items-center w-full text-[#ccc] ">
                    <div className="flex flex-row gap-2">
                      <img src={e.img} alt="" className="h-[10vh]" />
                      <div>
                        <h1>{e.title}</h1>
                        <p>{e.price}</p>
                        <p>color : {e.cc}</p>
                      </div>
                    </div>
                    <p>Qty : {e.qty}</p>
                    <p>${parseFloat(e.price.replace("$", "") * e.qty)}</p>
                    <button
                      className="pr-2"
                      onClick={() => {
                        deleteData(e._id);
                      }}
                    >
                      {<X />}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="w-full">
              <div className="w-full flex flex-col gap-2 px-3">
                <div className="py-2 border-b-[1px] border-b-[#ccc]">
                  <h1 className="capitalize font-semibold text-white">
                    order summary
                  </h1>
                </div>
                <div className="py-2 border-b-[1px] border-b-[#ccc] w-full">
                  <div className="flex justify-between items-center px-2 text-[#ccc] font-extralight text-sm">
                    <p>Subtotal</p>
                    <p>${sub}</p>
                  </div>
                  <div className="py-1">
                    <p
                      className="mx-2 text-[#ccc] text-sm border-b-[1px] w-fit  leading-5 pb-[1px] cursor-pointer"
                      onClick={() => {
                        gl();
                      }}
                    >
                      Delivery
                    </p>
                    <p className="mx-2 text-xs text-[#ccc] py-[2px]">
                      {location}
                    </p>
                  </div>
                </div>
                <div className="py-2 border-b-[1px] border-b-[#ccc] w-full flex justify-between text-2xl capitalize font-extralight text-[#ccc] items-center px-2">
                  <h1 className="">total</h1>
                  <h1 className="pb-2">${sub}</h1>
                </div>
                <div className="flex px-2 py-4">
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#d0b48f] capitalize"
                    onClick={() => {
                      setCheckoutLoading(true);
                      sendCheckout();
                    }}
                  >
                    checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
export default Cart;
