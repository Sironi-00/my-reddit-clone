import "./Header.css";
import Search from '../search/Search'
import { Link } from "react-router-dom";

export default function Header () {
    return (
        <header>
            <div className="logo">
                <Link to="/">reddit</Link>
                </div>
            <Search />
            <nav>
                <a href="">Home</a>
                <a href="">X</a>
            </nav>
        </header>
    );
} 