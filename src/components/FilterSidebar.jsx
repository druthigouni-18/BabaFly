const FilterSidebar = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  metal,
  setMetal,
  polish,
  setPolish,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-6">

      <div>
        <h3 className="font-semibold text-lg mb-3">
          Price Range
        </h3>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">
          Metal Type
        </h3>

        <select
          value={metal}
          onChange={(e) => setMetal(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All Metals</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Rose Gold">Rose Gold</option>
          <option value="Platinum">Platinum</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">
          Polish Type
        </h3>

        <select
          value={polish}
          onChange={(e) => setPolish(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All Polish</option>
          <option value="Glossy">Glossy</option>
          <option value="Matte">Matte</option>
          <option value="Antique">Antique</option>
        </select>
      </div>

    </div>
  );
};

export default FilterSidebar;