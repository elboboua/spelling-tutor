import { createContext, useContext, useState } from "react";
import { apiClient } from "../clients/apiClient";

// Auth Context has email, name, and token
export const AuthContext = createContext<AuthContextProps>({
    email: "",
    token: "",
    login: () => {},
    logout: () => {},
});

// Auth Context Props
export interface AuthContextProps {
    email: string;
    token: string;
    login: (email: string, password: string) => void;
    logout: () => void;
}

// Auth Context Provider Props
export interface AuthProviderProps {
    children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");

    const login = async (email: string, password: string) => {
        try {
            const res = await apiClient.post("auth/login", { email, password });
            setToken(res.data.jwt);
            setEmail(email);
            apiClient.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${res.data.jwt}`;
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setEmail("");
        setToken("");
        delete apiClient.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ email, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Auth Context Hook definition
export const useAuth = () => {
    return useContext(AuthContext);
};
