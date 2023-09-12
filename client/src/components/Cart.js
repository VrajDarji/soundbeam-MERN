import { ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart({ r }) {
  const [sub, setSub] = useState(0);
  const [p, setP] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
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
        const rr = await result.filter((cart) => cart.uid === currentUser);
        setP(rr);
        const a = result.map((e) => parseFloat(e.price.replace("$", ""), 10));
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
    fetchData();
  }, [p]);
  return (
    <div
      className="fixed right-0 top-0 h-[100vh] w-0 bg-[#242424] flex flex-col justify-between items-start cart"
      ref={r}
    >
      <div className="py-5 bg-[#fff] px-4 flex justify-start items-center w-full">
        <button
          onClick={() => {
            r.current.style.width = "0vw";
          }}
        >
          <ChevronRight />
        </button>
        <p className="w-[90%] text-xl font-semibold tracking-wide my-1 text-center">
          Cart
        </p>
      </div>
      <div className=" overflow-y-scroll h-[73vh] py-3 flex flex-col gap-2 w-full">
        {p.length === 0 ? (
          <>
            <div className="w-full px-3 py-3 ">
              <p className="uppercase text-white text-xl">cart is empty</p>
            </div>
          </>
        ) : (
          <>
            {p.map((e, index) => {
              return (
                <div
                  className="h-[10vh] w-full px-3 flex flex-row gap-3 justify-start items-center"
                  key={index}
                >
                  <img src={e.img} alt="" className="h-[10vh]" loading="lazy"/>
                  <div>
                    <p className="text-md capitalize text-white">{e.title}</p>
                    <p className="text-sm capitalize text-white">{e.cc}</p>
                    <p className="text-sm capitalize text-white">
                      Quantity : {e.qty}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      deleteData(e._id);
                    }}
                    className="px-[2px] py-[2px] rounded-[100%] border-[1px]"
                  >
                    <X size={10} color="white" />
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="w-full">
        <div className="w-full px-2 py-2 border-b-[1px] border-b-[#575757]">
          <h1 className="text-xl tracking-wider text-white">
            Sub Total: ${sub}
          </h1>
        </div>
        <div className="flex w-full px-10 py-4">
          <Link to={"/cart"} className="w-full">
            <button className="bg-[#d0b48f] w-full py-2">View Cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Cart;
