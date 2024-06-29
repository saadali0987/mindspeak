import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets/assets.js";
import "./Sidebar.css";
import { Context } from "../../context/Context.jsx";

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt } = useContext(Context);

  const onLoad = async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }


  return (
    <div className=" bg-[#f0f4f9] min-h-screen  inline-flex flex-col justify-between p-4">
      <div className="top">
        <img
          src={assets.menu_icon}
          alt=""
          className="cursor-pointer block ml-2"
          onClick={() => setExpand((prev) => !prev)}
        />
        <div className=" mt-[50px] bg-white inline-flex items-center gap-3 px-2 py-3 w-full rounded-sm text-sm text-gray-800 cursor-pointer">
          <img src={assets.plus_icon} alt="" />
          {expand ? <p>New Chat</p> : null}
        </div>
        {expand ? (
          <div className=" flex flex-col">
            <p className=" mt-7 mb-5 font-bold">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={()=>onLoad(item)} className="flex items-start gap-3 p-3 pr-10  rounded-full text-[#282828] cursor-pointer hover:bg-gray-300">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom flex flex-col gap-4">
        <div>
          <img src={assets.question_icon} alt="" />
          {expand ? <p>Help</p> : null}
        </div>
        <div>
          <img src={assets.history_icon} alt="" />
          {expand ? <p>Activity</p> : null}
        </div>
        <div>
          <img src={assets.setting_icon} alt="" />
          {expand ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
