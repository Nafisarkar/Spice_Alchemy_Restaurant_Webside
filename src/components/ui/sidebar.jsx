import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const menuItems = [
  { id: 1, label: "Breakfast" },
  { id: 2, label: "Lunch" },
  { id: 3, label: "Dinner" },
  { id: 4, label: "Drinks" },
];

const Sidebar = ({ setSelectedfood, selectedfoodId }) => {
  const [dropDown, setDropDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setDropDown(false);
      }
      console.log(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={`bg-[#40534C] h-[120px] text-white md:h-screen md:flex-1 relative z-1`}
      >
        <div className="p-4 h-full flex flex-col md:justify-center md:items-center lg:pb-8 ">
          <div>
            <div className="flex items-center justify-center md:items-center md:justify-start lg:items-start md:flex-col sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className={`flex flex-col items-start gap-2 leading-none ${
                  isMobile ? "cursor-pointer" : ""
                }`}
                onClick={() => {
                  if (isMobile) {
                    setDropDown(!dropDown);
                  }
                }}
              >
                <h1 className="font-sankofa text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Spice
                </h1>
                <h1 className="font-sankofa text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Alchemy
                </h1>
              </motion.div>
              <ul className="flex-col hidden md:flex items-start lg:items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 font-orbit text-xs sm:text-sm md:text-base lg:text-lg opacity-80">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    className={`cursor-pointer hover:opacity-100 ${
                      selectedfoodId === item.id ? "text-[#D6BD98]" : ""
                    }`}
                    onClick={() => setSelectedfood(item.id)}
                  >
                    {item.label}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {isMobile && dropDown && (
            <ul className="absolute top-[95px] left-0 w-full bg-[#32413b] p-4 flex flex-col items-center gap-4 md:hidden z-10">
              {menuItems.map((item, index) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: index * 0.1 + 0.2,
                  }}
                  className={`cursor-pointer opacity-10 hover:opacity-100 font-orbit text-xs sm:text-sm md:text-base lg:text-lg ${
                    selectedfoodId === item.id ? "text-[#D6BD98]" : ""
                  }`}
                  onClick={() => {
                    setSelectedfood(item.id);
                    setDropDown(false);
                  }}
                >
                  {item.label}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
