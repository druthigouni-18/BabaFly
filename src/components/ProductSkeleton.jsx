const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-64 bg-gray-200"></div>

      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>

        <div className="h-6 bg-gray-200 rounded w-3/4 mt-3"></div>

        <div className="h-6 bg-gray-200 rounded w-1/2 mt-4"></div>

        <div className="h-4 bg-gray-200 rounded w-2/3 mt-3"></div>

        <div className="h-10 bg-gray-200 rounded mt-5"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;