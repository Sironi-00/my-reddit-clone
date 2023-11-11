import "./Header.css";
import Search from "../search/Search";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <header>
            <div className="logo">
                <Link className="logo-text" to="/">
                    <span className="logo-span">Red</span>d<span className="logo-span">it</span>
                </Link>
            </div>
            <Search />
            <nav>
                <NavLink className="btn" to="">Home</NavLink>
                <NavLink className="btn" onClick={() => navigate(-1)}>Back</NavLink>
            </nav>
        </header>
    );
}
