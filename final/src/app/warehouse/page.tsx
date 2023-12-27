import AddProductButton from "./_components/AddProductButton";
import LeftDrawerButton from "./_components/LeftDrawerButton";
import ProductPreview from "./_components/ProductPreview";
import { productTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";


export default async function WarehousePage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  const products = await db.select(
    {
      id: productTable.displayId,
      productName: productTable.productName,
      sellerDisplayId: productTable.sellerdisplayId,
    }
  )
    .from(productTable)
    .where(eq(productTable.sellerdisplayId, userId))
    .execute();

  
  
  return (
    <main className="flex min-h-screen border-2 rounded-b-xl items-start">
      <LeftDrawerButton/>
      <div className="flex-col w-full justify-between">
        <div className="flex justify-between px-10 items-end">
          <p className="text-2xl font-semibold mt-5">Products</p>
          <AddProductButton/>
        </div>
        <div className="grid grid-cols-4 w-full px-10 gap-10 overflow-scroll py-5">
          {products.map((product) => 
            <ProductPreview productId={product.id} productName={product.productName} key={product.id}/>
          )}
        </div>
      </div>
      
      
    </main>
  );
}
