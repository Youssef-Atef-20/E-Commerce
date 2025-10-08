import { useState, useContext } from "react";
import ProductCard from "./ProductCard";
import { Data } from "../context/Data";

export default function ProductLayout({ limitPerPage = 8 }) {
  const products = useContext(Data) || []; 
  const [currentPage, setCurrentPage] = useState(1);

  
  if (products.length === 0) return <p>Loading...</p>;

  const totalPages = Math.ceil(products.length / limitPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startIndex = (currentPage - 1) * limitPerPage;
  const displayed = products.slice(startIndex, startIndex + limitPerPage);

  return (
    <>
      <div className="product-layout flex flex-wrap gap-4 p-4 justify-center">
        {displayed.map(product => (
          <ProductCard
            key={product.id}
            Id={product.id}
            Name={product.title}
            Price={product.price}
            Image={product.image}
            Category={product.category}
          />
        ))}
      </div>

      <div className="pagination flex gap-2 justify-center mt-4">
        {pages.map(n => (
          <button
            key={n}
            onClick={() => setCurrentPage(n)}
            className={`px-3 py-1 rounded cursor-pointer ${
              n === currentPage ? "border-2 border-black" : "bg-gray-200"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </>
  );
}
