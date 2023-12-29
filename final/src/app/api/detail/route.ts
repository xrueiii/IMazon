import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { productDetailTable } from "@/db/schema";
import type { ProductDetail } from "@/lib/types";

const addProductDetailSchema = z.object({
  productId: z.string(),
  productQuantity: z.number(),
  productPrice: z.string().min(1).max(20),
  productStyle: z.string().min(1).max(20),
  productImageLink: z.string(),
});

type addProductDetailRequest = z.infer<typeof addProductDetailSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    addProductDetailSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const {
    productId,
    productQuantity,
    productPrice,
    productStyle,
    productImageLink,
  } = data as addProductDetailRequest;

  try {
    const [temp] = await db
      .insert(productDetailTable)
      .values({
        productId: productId,
        productQuantity: productQuantity,
        productPrice: productPrice,
        productStyle: productStyle,
        productImageLink: productImageLink,
      })
      .onConflictDoNothing()
      .returning();

    const newProductDetail: ProductDetail = {
      id: temp.displayId,
      productId: temp.productId,
      quantity: temp.productQuantity,
      sold: temp.productSold ?? 0,
      price: temp.productPrice,
      imageLink: temp.productImageLink,
      style: temp.productStyle,
    };

    return NextResponse.json(
        { newProductDetail: newProductDetail },
        { status: 200 },
      );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
