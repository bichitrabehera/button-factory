import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, searchTerm]);

  const fetchProducts = async () => {
    let url = "/api/products";
    const params = [];
    if (categoryFilter) params.push("category=" + encodeURIComponent(categoryFilter));
    if (searchTerm) params.push("name=" + encodeURIComponent(searchTerm));
    if (params.length) url += "?" + params.join("&");

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const resetFilters = () => {
    setCategoryFilter("");
    setSearchTerm("");
  };

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`);
  };

  const handleViewDetails = (product) => {
    alert(`Viewing details for ${product.name}`);
  };

  const handleRandomAction1 = () => {
    alert("Random Action 1 triggered!");
  };

  const handleRandomAction2 = () => {
    alert("Random Action 2 triggered!");
  };

  return (
    <>
    {/* <Navbar/> */}
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800">Product Gallery</h1>
      <p className="text-center text-gray-600 mb-12 text-lg">
        Discover our premium collection of buttons and accessories. Use the filters below to narrow down your search and find your perfect match!
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Filter by Category:
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="buttons">Buttons</option>
            <option value="accessories">Accessories</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={resetFilters}
          className="bg-red-600 text-white py-3 px-8 rounded-md shadow-md hover:bg-red-700 transition-all duration-300"
        >
          Reset Filters
        </button>
        <button
          onClick={handleRandomAction1}
          className="bg-purple-600 text-white py-3 px-8 rounded-md shadow-md hover:bg-purple-700 transition-all duration-300"
        >
          Random Button 1
        </button>
        <button
          onClick={handleRandomAction2}
          className="bg-orange-500 text-white py-3 px-8 rounded-md shadow-md hover:bg-orange-600 transition-all duration-300"
        >
          Random Button 2
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={product.images && product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl text-gray-800 font-semibold text-center mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 text-center mb-4">{product.description}</p>
            <p className="font-semibold text-lg text-gray-800 mb-3">${product.price.toFixed(2)}</p>
            <p className={`mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleViewDetails(product)}
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductGallery;
