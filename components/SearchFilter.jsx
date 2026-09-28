import { useState } from "react";
import "./SearchFilter.css";

const users = [
  { id: 1, name: "Sara", role: "Front-End Developer" },
  { id: 2, name: "Lina", role: "Back-End Developer" },
  { id: 3, name: "Omar", role: "UI Designer" },
  { id: 4, name: "Ali", role: "Full-Stack Developer" },
  { id: 5, name: "Mona", role: "Front-End Developer" },
];

const roles = [
  "All",
  "Front-End Developer",
  "Back-End Developer",
  "UI Designer",
];


export default function SearchFilter() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const filtered = users.filter(
    (user) => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                            user.role.toLowerCase().includes(search.toLowerCase());
        
        const matchesRole = roleFilter === 'All' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    }
  )

  const highlight = (text) => {
    if (!search.trim()) return text;

    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="search-filter">
       <h1>Search & Filter Users</h1>
       <p className="subtitle">Find users easily by name or role.</p>
       <div className="filter-info">
        <p>Search: {search || "All users"}</p>
        <p>Role: {roleFilter}</p>
      </div>
        <div className="filter-buttons">
        {roles.map((role) => (
          <button
            key={role}
            className={roleFilter === role ? "active" : ""}
            onClick={() => setRoleFilter(role)}
          >
            {role === "All"
              ? "All"
              : role.replace(" Developer", "")}
          </button>
        ))}
      </div>
      <input type="text" 
              className="search-input"
            value= {search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or role..."/>
            <div className="results-heading">
              <span>Users List</span>
              <span className="results-count">
                {filtered.length} Results
              </span>
            </div>
            <ul>
              {filtered.map((user) => (
                <li key={user.id}>
                  <div className="user-avatar">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="user-details">
                    <strong>{highlight(user.name)}</strong>
                    <span className="user-role">
                      {highlight(user.role)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {filtered.length === 0 && (
              <div className="empty-state">
                No users found 😕
                <br />
                Try another search or filter.
              </div>
            )}
    </div>
  );
}
