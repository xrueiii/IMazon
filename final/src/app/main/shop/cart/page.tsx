import Image from "next/image";
import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cartsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import GoShoppingButton from "./_components/GoShoppingButton";
import Link from "next/link";

async function CartPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  const carts = await db.query.cartsTable.findMany({
    where: eq(cartsTable.userId, userId),
    with: {
      product: {
        columns: {
          displayId: true,
          productName: true,
        },
      },
      productDetail: {
        columns: {
          productImageLink: true,
          productPrice: true,
          productStyle: true,
        },
      },
    },
    columns: {
      buyQuantity: true,
      userId: true,
    },
  });

  if (carts.length === 0) {
    return (
      <div className="flex h-full w-full flex-wrap justify-center rounded-b-xl border-2 px-10">
        <div className="flex h-40 w-full items-end justify-center py-4 text-3xl font-semibold">
          <span>Your Cart is EMPTY !</span>
        </div>
        <div className="flex h-40 w-full items-start justify-center">
          <GoShoppingButton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-wrap justify-center rounded-b-xl border-2 px-10">
      {carts?.map((cart, index) => {
        return (
          <Link
            key={index}
            href={{
              pathname: `/main/warehouse/${cart.product.displayId}`,
            }}
            className="flex h-40 w-full items-center justify-center"
          >
            <div className="flex h-36 w-full items-center justify-center border-b-2 border-slate-300">
              <div className="relative flex h-36 w-1/6 items-center justify-center gap-2 p-2">
                <Image
                  src={cart.productDetail.productImageLink}
                  alt="product photo"
                  width={130}
                  height={130}
                />
              </div>
              <div className="relative flex h-36 w-1/6 items-center justify-center gap-2 p-2">
                {cart.product.productName}
                <br />
                款式： {cart.productDetail.productStyle}
              </div>
              <div className="relative flex h-36 w-1/6 items-center justify-center gap-2 p-2">
                單價： ${cart.productDetail.productPrice}
              </div>
              <div className="relative flex h-36 w-1/6 items-center justify-center gap-2 p-2">
                數量： {cart.buyQuantity}
              </div>
              <div className="relative flex h-36 w-1/6 items-center justify-center gap-2 p-2 text-lg font-semibold text-teal-900">
                總計： ${" "}
                {parseInt(cart.productDetail.productPrice) * cart.buyQuantity}
              </div>
              <div className="relative flex h-36 w-1/6 items-center justify-center gap-2 p-2">
                <Image
                  src="/delete.png"
                  alt="delete photo"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </Link>
        );
      })}
      <div className="h-40 w-full"></div>
    </div>
  );
}

export default CartPage;
