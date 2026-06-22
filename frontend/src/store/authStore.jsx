import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "../services/AuthService";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [theme,setTheme] = useState("light");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
     useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await me();
        setUser(res.data.user);
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [])
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                theme,
                setTheme,
                navigate,
                loading,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;