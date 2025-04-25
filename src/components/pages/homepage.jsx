import React, { useEffect, useState } from "react";
import Sidebar from "../ui/sidebar";
import Maincontent from "./maincontent";
import foods from "../../data/fooddata";
import NoiseOverlay from "../ui/NoiseOverlay";

const Homepage = () => {
  const [selectedfoodId, setSelectedfoodId] = useState(1);
  const [currentItemData, setCurrentItemData] = useState(
    foods[selectedfoodId - 1]
  );

  useEffect(() => {
    setCurrentItemData(foods[selectedfoodId - 1]);
  }, [selectedfoodId]);

  return (
    <div className="bg-[#D6BD98] flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <Sidebar
        setSelectedfood={setSelectedfoodId}
        selectedfoodId={selectedfoodId}
      />
      <Maincontent foodItem={currentItemData} />
      <NoiseOverlay amount={1} size={0.2} vignette={0.04} />
    </div>
  );
};

export default Homepage;
