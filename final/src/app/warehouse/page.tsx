import AddProductButton from "./_components/AddProductButton";
import LeftDrawerButton from "./_components/LeftDrawerButton";
import Product from "./_components/Product";

export default function WarehousePage() {
  
  return (
    <main className="flex min-h-screen border-2 rounded-b-xl items-start">
      <LeftDrawerButton/>
      <div className="flex-col w-full justify-between">
        <div className="flex justify-between px-10 items-end">
          <p className="text-2xl font-semibold mt-5">Products</p>
          <AddProductButton/>
        </div>
        <div className="grid grid-cols-4 w-full px-10 gap-10 overflow-scroll py-5">
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
        </div>
      </div>
      
      
    </main>
  );
}
