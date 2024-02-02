import { Link } from "react-router-dom";

function Home() {
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
        </div>
    );
}

export default Home;
