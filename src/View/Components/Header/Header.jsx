import "./Header.css";
import Search from "../Search/Search";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <header>
            <div className="logo">
                <h1>
                    <Link className="logo-text" to="/">
                        <span className="logo-span">Red</span><span className="logo-span-2">d</span><span className="logo-span">it</span>
                    </Link>
                </h1>
            </div>
            <Search />
            <nav>
                <a className="btn" href="/">Home</a>
                <NavLink className="btn" onClick={() => navigate(-1)}>Back</NavLink>
            </nav>
        </header>
    );
}
