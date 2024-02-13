import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { logout } = useAuth();
    return (
        <div>
            <Link
                style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "black",
                }}
                to="/study"
            >
                Study!
            </Link>
            <button onClick={logout}>Log out</button>
        </div>
    );
}

export default Home;
