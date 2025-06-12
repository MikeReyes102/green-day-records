// NOTE: This FilterPanel component is a future feature in development and is not live yet.
// It provides UI controls for filtering products by category, price range, and availability.

const FilterPanel = () => {
  return (
    <aside className="w-64 filter-panel p-4 h-screen">
      <h2 className="text-xl font-bold mb-4">Filter Options</h2>
      
      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Category</h3>
        <div className="flex flex-col gap-2">
          <label>
            <input type="checkbox" className="mr-2" /> Rock
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Jazz
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Pop
          </label>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Price Range</h3>
        <input type="range" min="0" max="100" className="w-full" />
        <p className="text-sm mt-2">Adjust price range</p>
      </div>

      {/* Availability Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Availability</h3>
        <div className="flex flex-col gap-2">
          <label>
            <input type="radio" name="availability" className="mr-2" /> In Stock
          </label>
          <label>
            <input type="radio" name="availability" className="mr-2" /> Out of Stock
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;