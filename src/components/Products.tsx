import { useDispatch } from "react-redux";
import { addItem } from "../app/cartSlice";


const Products = () => {

    const dispatch = useDispatch();

    const productList = [
        { id: 1, name: "Bread", price: 1.10 },
        { id: 2, name: "Milk", price: 0.50 },
        { id: 3, name: "Cheese", price: 0.90 },
        { id: 4, name: "Soup", price: 0.60 },
        { id: 5, name: "Butter", price: 1.20 },
    ]

    const handleAddToCart = (product: {
        id: number;
        name: string; 
        price: number; 
    }) => {
        dispatch(addItem({...product, quantity: 1}));
        // console.log("Product List Added:", product);
    }
  return (
    <div className="p-4 border-2 border-gray-300 rounded-lg  md:w-1/2 w-full h-full">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-300">Products</h2>
        <div>
            { productList.length === 0 ? (
                <p>No products available.</p>
            ) : (
            productList.map((product) => (
                <div key={product.id} className="p-2 mb-2 font-bold flex justify-between  border-b-2 border-gray-200">
                    <span>{product.name}</span>
                        <div> £{product.price.toFixed(2)}
                    <button 
                    className="ml-4 font-bold bg-blue-300 px-4 py-2 rounded-xl hover:bg-blue-500 "
                    onClick={() => handleAddToCart(product)}
                    >Add</button></div>
                </div>
            ))
            )}
        </div>
    </div>
    )
}

export default Products;