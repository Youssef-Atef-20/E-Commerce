import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { ProductCard } from "../components/ProductCard";

const LandingPage = () => {
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.products);
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="w-full font-sans">
            <section className="relative w-full py-20 px-6 bg-white overflow-hidden flex justify-center items-center">
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 "></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animation-delay-2000"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-red-600 leading-tight">
                        Fashion That Turns Heads
                    </h1>

                    <p className="text-gray-700 text-lg sm:text-xl mb-10 max-w-2xl">
                        Explore modern, stylish clothes that make you stand out. Minimal, bold, and made for trendsetters.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-10 py-4 shadow-lg transition transform "
                    >
                        Shop Now
                    </button>
                </div>
            </section>


            {/* FEATURED PRODUCTS + FINAL CTA */}
            <section className="bg-red-50 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-red-600 mb-12 text-center">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {/* FINAL CTA */}
                    <div className="text-center mt-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Want to see more products?
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Explore our full collection and find your perfect style.
                        </p>
                        <button
                            onClick={() => navigate("/products")}
                            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-10 py-4 shadow-lg transition transform "
                        >
                            Browse All Products
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default LandingPage;
