import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [theme,setTheme] = useState("light");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                theme,
                setTheme,
                navigate
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;