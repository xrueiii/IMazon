import AddProductButton from "./_components/AddProductButton";
import Product from "./_components/Product";

export default function WarehousePage() {
  
  return (
    <main className="flex-col min-h-screen w-full justify-between border-2 rounded-b-xl">
      <div className="flex justify-between px-20 items-end">
        <p className="text-2xl font-semibold mt-10">Products</p>
        <AddProductButton/>
      </div>
      <div className="grid grid-cols-3 w-full px-20 gap-5 overflow-scroll py-5">
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
      
    </main>
  );
}
