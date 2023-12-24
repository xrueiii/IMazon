import Product from "./_components/Product";

export default function WarehousePage() {
  return (
    <main className="flex-col h-full w-full justify-between border-2 rounded-b-xl">
      <p className="text-2xl font-semibold mt-10 ml-20">Products</p>
      <div className="grid grid-cols-3 w-full max-h-full px-20 gap-5 mt-5 overflow-scroll">
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
