import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Auth Context has email, name, and token
export const AuthContext = createContext<AuthContextProps>({
    email: "",
    name: "",
    token: "",
    login: () => {},
    logout: () => {},
});

// Auth Context Props
export interface AuthContextProps {
    email: string;
    name: string;
    token: string;
    login: (email: string, password: string, cb: () => void) => void;
    logout: () => void;
}

// Auth Context Provider Props
export interface AuthProviderProps {
    children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState("");

    const login = (email: string, password: string, cb: () => void) => {
        // Call the login API
        // Set the email, name, and token
        password;
        setEmail(email);
        setName("John Doe");
        setToken("12345");
        // cb();
    };

    const logout = () => {
        // Clear the email, name, and token
    };

    return (
        <AuthContext.Provider value={{ email, name, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Auth Context Hook definition
export const useAuth = () => {
    return useContext(AuthContext);
};
