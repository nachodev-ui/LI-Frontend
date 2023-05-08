import { useState } from "react";

export function Filters({}) {


  return (
    <section className="flex items-center justify-between">
      <div className="flex gap-4">
        <div className="mr-4">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={filters.genre}
            onChange={handleGenreChange}
          >
            <option value="all">All</option>
            <option value="fantasía">Fantasía</option>
            <option value="romance">Romance</option>
            <option value="terror">Terror</option>
          </select>
        </div>
        <div>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="range"
            min="0"
            max="100000"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handlePriceChange}
          />
          <span>${minPrice}</span>
        </div>
      </div>
    </section>
  );
}
