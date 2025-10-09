import { useContext, useState } from "react";
import { Data } from "../context/Data";
import ProductCard from "./ProductCard";

export default function ProductLayout({ products: propProducts, limitPerPage = 8, wrap = true }) {
    const contextProducts = useContext(Data);
    const products = propProducts || contextProducts || [];

    if (!Array.isArray(products)) {
        return <p className="p-6 text-gray-600">Loading products...</p>;
    }

    const totalPages = Math.ceil(products.length / limitPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const displayed = products.slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage);

    return (
        <div>
        <div className={"product-layout flex gap-4 p-4 justify-start " + (wrap ? "flex-wrap" : "overflow-x-auto")}>
            {displayed.map((p) => (
            <ProductCard key={p.id} {...p} /> 
            ))}
        </div>

        <div className="pagination flex gap-2 justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`px-3 py-1 rounded cursor-pointer ${n === currentPage ? "border-2" : "bg-gray-200"}`}
            >
                {n}
            </button>
            ))}
        </div>
        </div>
    );
}
