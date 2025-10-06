const ProductCard = ({ name, img = "https://placehold.co/200x200", price, oldPrice, id }) => {
    function handleFavorite() {
        console.log("Favorite clicked for product:", id);
    }

    function handleEye() {
        console.log("Eye clicked for product:", id);
    }

    function GoToProductPage() {
        console.log("Navigating to product page for product:", id);
    }
    
    return (
        <div className='flex flex-col cursor-pointer w-[200px] items-start text-left' onClick={GoToProductPage}>
            <div className='w-[200px] h-[200px] relative'>
                <img className='w-full h-full object-cover' src={img} alt={name} />
                <div className='absolute top-2 right-2 p-1 flex flex-col gap-2'>
                    <button className='bg-white rounded-full cursor-pointer' onClick={handleFavorite}>❤️</button>
                    <button className='bg-white rounded-full cursor-pointer' onClick={handleEye}>👁️</button>
                </div>
            </div>
            <div className='flex flex-col font-semibold'>
                <p>{name}</p>
                <div className="flex gap-2">
                    <p className="text-red-600">{price}$</p>
                    {oldPrice && oldPrice > price ? <p className='line-through opacity-50'>{oldPrice}$</p> : null}
                </div>
            </div>
        </div>
    )
}

export default ProductCard