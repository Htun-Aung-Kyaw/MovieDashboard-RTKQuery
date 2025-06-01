import {useState} from "react";

export default function SearchBar({className, searchTerm, setSearchTerm, sort, setSort}:
{
    className?: string,
    searchTerm?: string,
    setSearchTerm: (searchTerm: string) => void,
    sort?: string,
    setSort: (sort: string) => void,
}) {

    // const [searchTerm, setSearchTerm] = useState('');
    // const [sort, setSort] = useState('Original');

    return (
        <div className={className + " user-filter-container"} >
            <div className="filter-controls">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={e=>setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <label htmlFor="sort"><b>Sort by name:</b></label>
                <select
                    id="sort"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="select"
                >
                    <option key={"Original"} value={"Original"}>
                        Original
                    </option>
                    <option key={"Asc"} value={"Ascending"}>
                        Ascending
                    </option>
                    <option key={"Desc"} value={"Descending"}>
                        Descending
                    </option>
                </select>
            </div>
        </div>
    );
}