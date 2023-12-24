import AddProductForm from "./_components/AddProductForm";

export default async function AddProductPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-white p-24 w-full border-2">
      <div className="flex min-w-[400px] items-center justify-center gap-4 rounded-xl border-2 border-black bg-white py-5 font-semibold">
        Add a product
      </div>
      <AddProductForm />
    </main>
  );
}