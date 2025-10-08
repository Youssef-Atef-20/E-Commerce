import { useState, useContext } from "react";
import ProductCard from "./ProductCard";
import { Data } from "../context/Data";

export default function ProductLayout({ products, limitPerPage, wrap }) {
    const currentNumberOfPages = Math.ceil(products.length / limitPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const pages = Array.from({ length: currentNumberOfPages }, (_, i) => i + 1);

    const startIndex = (currentPage - 1) * limitPerPage;
    const displayed = products.slice(startIndex, startIndex + limitPerPage);

    return (
        <div>
            <div className={"product-layout flex gap-4 p-4 justify-start " + (wrap ? 'flex-wrap' : 'overflow-x-auto')}>
                {displayed.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
            <div className="pagination flex gap-2 justify-center mt-4">
                {pages.map((n) => (
                    <button
                        key={n}
                        onClick={() => setCurrentPage(n)}
                        className={`px-3 py-1 rounded cursor-pointer ${n === currentPage ? 'border-2' : 'bg-gray-200'}`}
                        aria-current={n === currentPage}
                    >
                        {n}
                    </button>
                ))}
            </div>
        </div>
    )
}
