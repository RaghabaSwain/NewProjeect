import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutUserAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const TopBar = () => {
    const navigate = useNavigate();
    const {user} = useUserContext()

    const {mutateAsync:signOutUserAccount,isSuccess} = useSignOutUserAccount();
    useEffect(()=>{
        if(isSuccess) navigate('/sign-in')
    },[isSuccess])

  return (
    <section className="sticky top-0 z-50 md:hidden bg-dark-2 w-full">
      <div className="flex justify-between items-center py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            height={325}
            width={130}
          />
        </Link>
        <div className="flex gap-4">
          <button className="flex items-center hover:bg-transparent" onClick={signOutUserAccount}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </button>
          <Link to={`/profile/${user.id}`} className="flex items-center justify-center"><img src={user.imageUrl} alt="profile"  className="rounded-full h-8 w-8"/></Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
