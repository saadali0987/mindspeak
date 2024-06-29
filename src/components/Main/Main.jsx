import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSent();
    }
  };


  return (
    <div className="flex-1 min-h-screen relative">
      <div className="text-[#585858] flex items-center justify-between  text-4xl p-5 mt-6">
        <p>Mindspeak</p>
        <img src="https://static.vecteezy.com/system/resources/previews/000/199/370/original/vector-robot-cheerful-isolated-on-blue-background-concept-illustration.jpg" alt="" className=" w-11 rounded-full" />
      </div>

      <div className=" max-w-[900px] m-auto">
        {!showResult ? (
          <>
            <div className=" my-12 text-5xl text-[#c4c7c5] font-medium p-5">
              <p>
                <span className="name">Hello, Saad</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div>
                <p>Suggest online courses to do this summers</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div>
                <p>Briefly summarize this concept: Quantum Computing</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div>
                <p>Tips to increase my GPA</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div>
                <p>Differences between Mongodb and SQL</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>{" "}
          </>
        ) : (
          <div className=" p-4 result  max-h-[70vh] overflow-y-scroll">
            <div className=" flex items-center gap-5 my-10">
              <img
                className=" w-10 rounded-full"
                src="https://static.vecteezy.com/system/resources/previews/000/199/370/original/vector-robot-cheerful-isolated-on-blue-background-concept-illustration.jpg"
                alt=""
              />
              <p>{recentPrompt}</p>
            </div>
            <div className="flex items-start gap-5">
              <img className="w-10" src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className=" w-full flex flex-col gap-3">
                    <hr className="loader" />
                    <hr className="loader" />
                    <hr className="loader" />
                </div>
              ) : (
                <p className=" text-lg font-light  leading-9" dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className=" absolute bottom-5 w-full max-w-[900px] px-5 m-auto">
          <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] p-3 rounded-[50px]">
            <input
              type="text"
              placeholder="enter a prompt here"
              className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center gap-3">
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img className=" cursor-pointer" onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
