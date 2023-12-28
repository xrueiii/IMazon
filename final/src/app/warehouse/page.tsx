import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import AddProductButton from "./_components/AddProductButton";
import GetSerachName from "./_components/GetSearchName";
import LeftDrawerButton from "./_components/LeftDrawerButton";
import ProductPreview from "./_components/ProductPreview";

type Pageprops = {
  searchParams: {
    searchName: string;
  };
};

export default async function WarehousePage({
  searchParams: { searchName },
}: Pageprops) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  console.log(searchName);
  const products = await db
    .select({
      id: productTable.displayId,
      productName: productTable.productName,
      sellerDisplayId: productTable.sellerdisplayId,
    })
    .from(productTable)
    .where(eq(productTable.sellerdisplayId, userId))
    .execute();

  const searchProduct = await db
    .select({
      id: productTable.displayId,
      productName: productTable.productName,
      sellerDisplayId: productTable.sellerdisplayId,
    })
    .from(productTable)
    .where(eq(productTable.productName, searchName))
    .execute();

  return (
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
      <LeftDrawerButton />
      <div className="w-full flex-col justify-between">
        <div className="flex items-end justify-between px-10">
          <p className="mt-5 text-2xl font-semibold">Products</p>
          <div className="flex items-center justify-center gap-10">
            <div>
              <GetSerachName />
            </div>
            <AddProductButton />
          </div>
        </div>
        <div className="grid w-full grid-cols-4 gap-10 overflow-scroll px-10 py-5">
          {(searchName === undefined || searchName === "") &&
            products.map((product) => (
              <ProductPreview
                productId={product.id}
                productName={product.productName}
                key={product.id}
              />
            ))}
          {searchName !== undefined &&
            searchName !== "" &&
            searchProduct.map((product) => (
              <ProductPreview
                productId={product.id}
                productName={product.productName}
                key={product.id}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
