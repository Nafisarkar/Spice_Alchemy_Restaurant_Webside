import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Maincontent = ({ foodItem }) => {
  if (!foodItem) {
    return (
      <div className="bg-[#D6BD98] flex-grow h-full flex flex-col items-center lg:justify-center font-orbit p-8 md:p-10 lg:p-12 overflow-y-auto ">
        Select an item from the sidebar.
      </div>
    );
  }

  const { id, name, image, title, subtitle, pairitems, price } = foodItem;

  return (
    <div className="bg-[#D6BD98] flex-grow h-full flex flex-col items-start lg:justify-center font-orbit p-8 md:p-10 lg:p-12 overflow-y-auto relative">
      <div className="flex flex-col items-center gap-4 w-full max-w-5xl pb-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 w-full">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[506px] flex-shrink-0 mt-8 ml-4 z-0">
            <AnimatePresence mode="wait">
              <motion.h1
                key={id || name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -left-2 z-1 text-[12px] md:text-[18px] lg:text-[18px] m-2"
              >
                {name}
              </motion.h1>
              <motion.img
                key={id || image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                src={image}
                alt={title}
                className="w-full h-auto lg:h-[506px] object-cover rounded-lg shadow-2xl"
              />
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={id || title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full lg:w-[320px] mt-4 lg:mt-0 text-center lg:text-left"
            >
              <h1 className="text-2xl md:text-3xl lg:text-[30px] wrap-normal font-semibold">
                {title}
              </h1>
              <p className="text-sm md:text-base lg:text-[14px] wrap-normal pt-2 pb-4 leading-relaxed md:leading-7 lg:leading-8 opacity-80">
                {subtitle}
              </p>
              <div>
                <h1 className="text-base md:text-lg lg:text-[18px] wrap-normal pb-2 font-medium">
                  Pair It With -
                </h1>
                <ul className="text-xs md:text-sm lg:text-[12px] space-y-1 md:space-y-2">
                  {pairitems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center lg:justify-start pb-1 md:pb-2"
                    >
                      <span className="w-2 h-2 bg-[#40534C] inline-block rounded-full mr-2 md:mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 mt-4 border-t border-[#40534C]/30">
                  <h1 className="text-base md:text-lg lg:text-[18px] inline-block font-medium">
                    Price : {price} ৳
                  </h1>
                  <p className="opacity-70 text-xs md:text-sm lg:text-[12px] inline-block ml-2 lg:block lg:ml-0">
                    + 5% vat
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 opacity-50 hidden lg:block lg:text-[12px] text-[#40534C]/70"
      >
        <a
          href="https://github.com/Nafisarkar"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => {
            event.stopPropagation();
            window.open("https://github.com/Nafisarkar", "_blank");
          }}
        >
          Shaon An Nafi | Github
        </a>
      </motion.div>
    </div>
  );
};

export default Maincontent;
