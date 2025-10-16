import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, title, image, price }) => {
    const navigate = useNavigate();

    function handleFavorite(e) {
        e.stopPropagation();
        console.log("Favorite clicked for product:", id);
    }

    function handleEye(e) {
        e.stopPropagation();
        console.log("Eye clicked for product:", id);
    }

    function GoToProductPage() {
        console.log("Navigating to product page for product:", id);
        navigate(`/product/${id}`);
    }

    return (
        <div
            onClick={GoToProductPage}
            className="
                flex flex-col cursor-pointer
                w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]
                items-start text-left
                p-3 border rounded-lg hover:shadow-lg transition bg-white
                mx-auto sm:mx-0
            "
        >
        <div
            className="
            relative flex justify-center items-center overflow-hidden rounded-md
            w-full
            h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px]
            "
        >
            <img
                className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                src={image}
                alt={title}
            />

            <div className="absolute top-0 right-0 p-1 flex flex-col gap-2">
                <button
                    className="bg-white rounded-full shadow-sm p-1"
                    onClick={handleFavorite}
                >
                    ❤️
                    </button>
                <button
                    className="bg-white rounded-full shadow-sm p-1"
                    onClick={handleEye}
                >
                    👁️
                </button>
            </div>
        </div>

        <div className="flex flex-col font-semibold mt-2 w-full">
            <p className="truncate" title={title}>{title}</p>
            <p className="text-red-600 align">{price}$</p>
        </div>
    </div>
    );
};

export default ProductCard;
