import "./Search.css";

import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { Search as SearchIcon } from "@mui/icons-material"

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      return;
    }
    setSearchQuery("");
    const uriString = encodeURIComponent(searchQuery);
    
    navigate(`/search?q=${uriString}`);
  }


  return (
    <div className="search">
      <form onSubmit={handleSearch} role="search">
        <input type="search" name="search" id="" placeholder="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button className="search-btn" type="submit"><SearchIcon /></button>
      </form>
    </div>
  )
}
