import Cart from "./components/Cart";
import Products from "./components/Products"

function App() {

  return (
    <div className="p-4 m-4">
      {/* <h1 className=" text-center text-xl font-bold underline pb-4 mb-4">
        Simple E-com checkout Page
      </h1> */}
      <div className="flex gap-4 w-full justify-center flex-col md:flex-row  ">
        <Products />
        <Cart />
      </div>
    </div>
  )
}

export default App
