import React from "react";

const Title = ({ children }) => {
  return (
    <div className="text-2xl md:text-4xl font-bold text-[#fc8298] px-4 pb-3 pt-1 border-l-2 bg-linear-to-r from-[#5bb4b7]/20 border-[#5bb4b7] w-fit">
      {children}
    </div>
  );
};

export default Title;
