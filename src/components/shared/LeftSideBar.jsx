import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { SideBarLinks } from "../../constants/SideBarLinks";
import { useSignOutUserAccount } from "../../lib/react-query/queriesAndMutations";

const LeftSideBar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const {mutateAsync:signOutUserAccount} = useSignOutUserAccount()

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-24">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            height={36}
            width={170}
          />
        </Link>
        <Link
          to={`/profile/${user.id}`}
          className="flex items-center justify-start gap-2"
        >
          <img
            src={user.imageUrl}
            alt="profile"
            className="rounded-full h-8 w-8"
          />
          <div className="flex flex-col gap-0">
            <p className="text-gray-200 py-0">{user.name}</p>
            <p className="text-slate-400 py-0 text-sm">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {SideBarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <NavLink
                to={link.route}
                key={link.label}
                className={`rounded-lg hover:bg-purple-600 flex gap-3 py-2 text-center pl-4 ${
                  isActive && "bg-purple-600"
                }`}
              >
                <img src={link.imgURL} alt="logo" />
                {link.label}
              </NavLink>
            );
          })}
        </ul>
      </div>
      <button className="flex items-center hover:bg-transparent" onClick={signOutUserAccount}>
            <img src="/assets/icons/logout.svg" alt="logout" />
            Log Out
          </button>
    </nav>
  );
};

export default LeftSideBar;
