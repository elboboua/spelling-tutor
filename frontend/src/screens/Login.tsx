import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, token } = useAuth();
    const navigate = useNavigate();

    // redirect to home if token exists before rendering
    if (token) {
        navigate("/");
    }

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "300px",
            }}
        >
            <h1>Login</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                }}
            >
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                onClick={() => {
                    login(email, password);
                }}
            >
                do it
            </button>
        </div>
    );
}
