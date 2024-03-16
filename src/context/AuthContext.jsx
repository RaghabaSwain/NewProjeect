import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/Appwrite/api";
import { useNavigate } from "react-router-dom";

const initialuser = {
  id: "",
  name: "",
  username: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: initialuser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentUser = await getCurrentUser();
     
      
      if (currentUser?.email) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          username: currentUser.username,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
  };

  useEffect(()=>{
    const cookieFallBack = localStorage.getItem('cookieFallback');
    if(cookieFallBack===null || cookieFallBack==='[]'){
        navigate('/sign-in')
    }
    checkAuthUser();
  },[])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
