import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const reviews = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et tempore nobis blanditiis in?",
  "Review second this is random paragraph reviews good product",
  " Good Producct!!!! Exclellent delivery godd battery life best",
];

function Fourth() {
  console.log(reviews.length);
  const s = useRef([]);
  const [i, setI] = useState(0);
  const [r, setR] = useState("");
  const Dec = () => {
    setI((prev) => (prev === 0 ? 2 : prev - 1));
  };
  const Inc = () => {
    setI((prev) => (prev === 2 ? 0 : prev + 1));
  };
  useEffect(() => {
    setTimeout(() => {
      setI((prev) => (prev === 2 ? 0 : prev + 1));
    }, 10000);
    setR(reviews[i]);
  }, [i]);
  return (
    <div className="h-[80vh] px-5 py-8 flex flex-col justify-center items-center gap-5 bg-white" id="review">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-4xl tracking-[0.3rem] text-[#2d2d2d] font-extralight">
          Reviews
        </h1>
        <hr className="w-[40%] text-[#2d2d2d]" />
      </div>
      <div className="flex w-full flex-row gap-12 h-[80%] justify-between items-center">
        <button onClick={Dec}>
          <ChevronLeft size={40} />
        </button>
        <p className="text-center text-5xl w-[60%] text-[#2d2d2d] font-light">
          {r}
        </p>
        <button>
          <ChevronRight size={40} onClick={Inc} />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        {reviews.map((e, index) => (
          <div
            key={index}
            className={`h-2 w-2 bg-[#2d2d2d] rounded-[100%] ${
              index === i ? "bg-[#c0c0c0]" : ""
            }`}
            ref={(e) => (s.current = e)}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default Fourth;
