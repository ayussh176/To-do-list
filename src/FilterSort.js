import React from "react";

function FilterSort({ setFilter, setSort }) {
    return (
        <div className="filter-sort">
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
            <select onChange={(e) => setSort(e.target.value)}>
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
            </select>
        </div>
    );
}

export default FilterSort;
