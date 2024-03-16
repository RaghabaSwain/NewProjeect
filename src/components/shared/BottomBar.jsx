import React from "react";
import { BottomBarLinks } from "../../constants/BottomBarLinks";
import { NavLink, useLocation } from "react-router-dom";

const BottomBar = () => {
    const {pathname} =useLocation()
  return (
    <section className="z-50 flex justify-between items-center w-full sticky bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden">
       
          {BottomBarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <NavLink
                to={link.route}
                key={link.label}
                className={`rounded-lg hover:bg-purple-600 flex flex-col  justify-around  items-center py-2 text-center p-3 ${
                  isActive && "bg-purple-600"
                }`}
              >
                <img src={link.imgURL} alt="logo" width={20} height={20}/>
                {link.label}
              </NavLink>
            );
          })}
       
    </section>
  );
};

export default BottomBar;
