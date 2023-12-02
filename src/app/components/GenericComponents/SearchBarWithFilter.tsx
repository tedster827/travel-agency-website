import React from "react";


/**
 * SearchBarWithFilter (FC Functional) component for the application.
 *
 * This component renders a Generic Search Bar With a Filter Toggle Component for a standardized functionally and
 * styling.
 *
 * NOTE: This is is not functional, yet.
 *
 * TODO: This needs to be build to display destinations
 *
 */

const SearchBarWithFilter: React.FunctionComponent = () => {
    return (
        <>
            <div className="join">
              <div>
                <div>
                  <input className="input input-bordered join-item" placeholder="Search"/>
                </div>
              </div>
              <select
                  className="select select-bordered join-item"
                  defaultValue={"Filter"}
              >
                <option disabled>Filter</option>
                <option>With 1 Hour by Car</option>
                <option>Domestic</option>
                <option>International</option>
              </select>
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">In Development!</span>
                <button className="btn join-item">Search</button>
              </div>
            </div>
        </>
    )
}

export default SearchBarWithFilter;