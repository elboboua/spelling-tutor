import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login, token } = useAuth();
    const navigate = useNavigate();

    if (token) {
        navigate("/");
    }

    return (
        <div>
            <h1>Login</h1>
            <button
                onClick={() => {
                    login("test", "test", () => navigate("/"));
                }}
            >
                do it
            </button>
        </div>
    );
}
