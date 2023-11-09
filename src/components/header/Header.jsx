import "./Header.css";
import Search from '../search/Search'
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Header () {
    const navigate = useNavigate();
    return (
        <header>
            <div className="logo">
                <Link to="/">reddit</Link>
                </div>
            <Search />
            <nav>
                <NavLink to="">Home</NavLink>
                <NavLink onClick={() => navigate(-1)}>Back</NavLink>
            </nav>
        </header>
    );
} 