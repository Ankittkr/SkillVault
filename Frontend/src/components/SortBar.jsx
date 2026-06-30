import React from "react";

const SortBar = ({ sortBy, setSortBy, count }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

        <h2 className="font-semibold">
          {count} Courses Found
        </h2>

        <div className="flex gap-3 items-center">

          <span className="font-medium">
            Sort By:
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="relevance">Relevance</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>

        </div>

      </div>

    </div>
  );
};

export default SortBar;