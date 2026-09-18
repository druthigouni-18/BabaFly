import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import FilterSidebar from "../components/FilterSidebar";
import api from "../utils/axios";

const PRODUCTS_PER_PAGE = 9;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [metal, setMetal] = useState("");
  const [polish, setPolish] = useState("");

  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await api.get("/products?limit=100");

        setProducts(response.data.products);
      } catch (err) {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword) ||
          product.brand?.toLowerCase().includes(keyword)
      );
    }

    // Price
    if (minPrice !== "") {
      result = result.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    if (maxPrice !== "") {
      result = result.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    // Demo metal/polish values
    if (metal) {
      result = result.filter((product) => {
        const metals = ["Gold", "Silver", "Rose Gold", "Platinum"];
        return metals[product.id % metals.length] === metal;
      });
    }

    if (polish) {
      result = result.filter((product) => {
        const polishes = ["Glossy", "Matte", "Antique"];
        return polishes[product.id % polishes.length] === polish;
      });
    }

    // Sorting
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "latest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, search, minPrice, maxPrice, metal, polish, sort]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const currentProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [search, minPrice, maxPrice, metal, polish, sort]);

  const clearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setMetal("");
    setPolish("");
    setSort("latest");
    setPage(1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">
          Jewellery Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Jewellery Collection
          </h1>

          <p className="text-gray-500 mt-1">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-4 py-2.5 bg-white"
        >
          <option value="latest">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jewellery, category or brand..."
          className="w-full border rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Filters */}
        <aside>
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            metal={metal}
            setMetal={setMetal}
            polish={polish}
            setPolish={setPolish}
          />

          <button
            onClick={clearFilters}
            className="w-full mt-3 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 transition"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Products */}
        <main className="lg:col-span-3">

          {currentProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <div className="text-5xl mb-4">🔍</div>

              <h2 className="text-xl font-semibold">
                No products found
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 bg-pink-600 text-white px-5 py-2.5 rounded-lg hover:bg-pink-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-40"
                  >
                    ← Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`w-10 h-10 rounded-lg border ${
                        page === pageNumber
                          ? "bg-pink-600 text-white border-pink-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-40"
                  >
                    Next →
                  </button>

                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;