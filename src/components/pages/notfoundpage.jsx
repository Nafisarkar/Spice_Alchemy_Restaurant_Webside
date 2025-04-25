import React from "react";
import { useNavigate } from "react-router";

const Notfoundpage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-[#D6BD98] h-[100vh] flex justify-center items-center">
        <div
          className="font-sankofa text-center text-[#40534C] text-[50px] text-bold"
          onClick={() => navigate("/")}
        >
          I guess you are not Hungry
        </div>
      </div>
    </div>
  );
};

export default Notfoundpage;
