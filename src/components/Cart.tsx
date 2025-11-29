import { useDispatch, useSelector } from "react-redux";
import type { rootState } from "../app/store";
import { clearCart, decreaseQty, increaseQty } from "../app/cartSlice";

const Cart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector((state: rootState) => state.cart.items);

  const soup = cartItems.find(item => item.name === "Soup");

  const getItemSavings = (item: {
    name: string;
    price: number;
    quantity: number;
  }) => {
    if (item.name === "Cheese") {
      return Math.floor(item.quantity / 2) * item.price;
    }
    if (item.name === "Bread" && soup) {
      return Math.min(soup.quantity, item.quantity) * (item.price / 2);
    }
    if (item.name === "Butter") {
      return item.quantity * (item.price / 3);
    }
    return 0;
  }

  const finalSavings = (item: {
    name: string;
    price: number;
    quantity: number;
  }) => {
    return (item.price * item.quantity) - getItemSavings(item);
  };

  const handleCheckout = () => {
    alert("Ordered Placed Successfully!");
    dispatch(clearCart());
  }



  const totalSavings = cartItems.reduce((total, item) => total + getItemSavings(item), 0);
  const subTotal = cartItems.reduce((total, item) =>
    total + item.price * item.quantity, 0);
  const totalAmount = subTotal - totalSavings;


  return (
    <div className="p-4 border-2 border-gray-300 rounded-lg md:w-1/3 w-full">
      <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-300">Basket</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className=" p-2 mb-4 border-gray-200 border-t-2">
            <div className="flex justify-between items-center">
              <span className="font-bold">{item.name} </span>

              <div className="flex items-center gap-2"> <span>£{(item.price).toFixed(2)}</span>
                <button className="font-bold bg-blue-300  rounded  py-1 hover:bg-blue-500 px-3  "
                  onClick={() => dispatch(increaseQty(item.id))}
                >+</button>
                <span>{item.quantity}</span>
                <button className=" font-bold bg-gray-300  rounded py-1 hover:bg-gray-400 px-3  "
                  onClick={() => dispatch(decreaseQty(item.id))}
                >-</button>
              </div>
            </div>
            <div className="mt-2 text-right text-sm">
              <p>Item price £{(item.price).toFixed(2)} * {item.quantity} = £{(item.price * item.quantity).toFixed(2)}</p>
              {getItemSavings(item) > 0 && (
                <p className="text-red-500 border-t border-gray-200 pt-1">Savings £{getItemSavings(item).toFixed(2)}</p>
              )}
              <p className="border-t border-gray-200 pt-1 mt-1">Item cost £{finalSavings(item).toFixed(2)}</p>
            </div>
          </div>
        ))
      )}
      <div className="mt-4 pt-4 mb-4 border-t-2 border-gray-300">
        <div className="flex justify-between font-bold">
          <span>Sub Total:</span>
          <span>£{subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Savings:</span>
          <span>£{totalSavings.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total Amount:</span>
          <span>£{totalAmount.toFixed(2)}</span>
        </div>
      </div>
      <button className="font-bold bg-green-300 p-4 rounded-xl hover:bg-green-500 " onClick={handleCheckout}>Check Out</button>
    </div>
  )
}




export default Cart;