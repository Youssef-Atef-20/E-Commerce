import { X, Plus, Minus } from "lucide-react";
import type { TProduct } from "../Types";

export const CartProduct = ({
    product,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
}: {
    product: TProduct;
    quantity: number;
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
}) => {
    const subtotal = (product.price * quantity).toFixed(2);

    return (
        <div className="w-full bg-white rounded-xl p-4 shadow-sm border-b md:grid md:grid-cols-5 md:items-center">
            
            <div className="flex items-center gap-4 col-span-2 min-w-0">
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-16 h-16 object-contain shrink-0"
                />

                <div className="flex flex-col min-w-0">
                    <p className="font-semibold text-gray-800 truncate max-w-[180px] md:max-w-none">
                        {product.name}
                    </p>

                    <p className="text-red-600 font-medium text-sm md:hidden mt-0.5">
                        ${product.price.toFixed(2)} × {quantity} = ${subtotal}
                    </p>
                </div>
            </div>

            <div className="hidden md:flex md:justify-start">
                <span className="font-medium text-gray-800">${product.price.toFixed(2)}</span>
            </div>

            <div className="hidden md:flex md:flex-col md:items-center md:justify-center">
                <div className="flex items-center border border-gray-300 rounded-md h-10 w-28 overflow-hidden">
                    <button
                        className="w-8 h-full text-gray-600 hover:bg-gray-100 flex justify-center items-center"
                        onClick={() => quantity > 1 ? onDecrease(product._id) : null}
                        disabled={quantity <= 1}
                    >
                        <Minus size={14} />
                    </button>

                    <span className="font-medium text-center text-gray-900 w-12 h-full flex items-center justify-center text-sm border-l border-r border-gray-300">
                        {String(quantity).padStart(2, "0")}
                    </span>

                    <button
                        className="w-8 h-full text-gray-600 hover:bg-gray-100 flex justify-center items-center"
                        onClick={() => quantity < product.stock ? onIncrease(product._id) : null}
                        disabled={quantity >= product.stock}
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            <div className="hidden md:flex md:items-center md:pr-2 md:w-full">
                <div className="flex items-center justify-start flex-1">
                    <span className="text-lg font-bold text-gray-800">${subtotal}</span>
                </div>

                <div className="flex items-center justify-end">
                    <button
                        onClick={() => onRemove(product._id)}
                        className="text-gray-400 hover:text-red-500 cursor-pointer p-1"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between md:hidden h-full">
                <button
                    onClick={() => onRemove(product._id)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer p-1"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center border border-gray-300 rounded-md h-8 w-20 overflow-hidden mt-4">
                    <button
                        className="w-5 h-full text-gray-600 hover:bg-gray-100 flex justify-center items-center"
                        onClick={() => quantity > 1 ? onDecrease(product._id) : null}
                        disabled={quantity <= 1}
                    >
                        <Minus size={12} />
                    </button>

                    <span className="font-medium text-center text-gray-900 w-10 h-full flex items-center justify-center text-sm border-l border-r border-gray-300">
                        {quantity}
                    </span>

                    <button
                        className="w-5 h-full text-gray-600 hover:bg-gray-100 flex justify-center items-center"
                        onClick={() => quantity < product.stock ? onIncrease(product._id) : null}
                        disabled={quantity >= product.stock}
                    >
                        <Plus size={12} />
                    </button>
                </div>
            </div>

        </div>
    );
};
