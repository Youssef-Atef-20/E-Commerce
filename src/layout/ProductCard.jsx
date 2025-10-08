const ProductCard = ({ Name, Image, Price, Id }) => {
    
    function handleFavorite() {
        console.log("Favorite clicked for product:", Id);
    }

    function handleEye() {
        console.log("Eye clicked for product:", Id);
    }

    function GoToProductPage() {
        console.log("Navigating to product page for product:", Id);
    }
    
    return (
        <div className='flex flex-col cursor-pointer w-[200px] items-start text-left' onClick={GoToProductPage}>
            <div className='w-[200px] h-[200px] relative flex justify-center align-middle'>
                <img className='w-5/6 justify-center object-contain' src={Image} alt={Name} />
                <div className='absolute top-2 right-2 p-1 flex flex-col gap-2'>
                    <button className='bg-white rounded-full cursor-pointer' onClick={handleFavorite}>❤️</button>
                    <button className='bg-white rounded-full cursor-pointer' onClick={handleEye}>👁️</button>
                </div>
            </div>
            <div className='flex flex-col font-semibold'>
                <p>{Name}</p>
                <div className="flex gap-2">
                    <p className="text-red-600">{Price}$</p>
                    {/* {oldPrice && oldPrice > Price ? <p className='line-through opacity-50'>{oldPrice}$</p> : null} */}
                </div>
            </div>
        </div>
    )
}

export default ProductCard




// { name, img = "https://placehold.co/200x200", price, oldPrice, id }