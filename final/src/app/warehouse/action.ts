"use server";

import { redirect } from "next/navigation";

import { z } from "zod";

import { db } from "@/db";
import { productTable, productDetailTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import type { Product, ProductDetail } from "@/lib/types";

const addProductSchema = z.object({
  productName: z.string().min(1).max(100),
  productDescription: z.string().min(1).max(300),
});

export async function addProduct(
  productName: Product["productName"],
  productDescription: Product["productDescription"],
) {

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  try {
    addProductSchema.parse({
      productName: productName,
      productDescription: productDescription,
    });
  } catch (error) {
    alert("There's something wrong with the input for adding product. Please try again!");
  }

  const [temp] = await db
    .insert(productTable)
    .values({
        productName: productName,
        productDescription: productDescription,
        sellerdisplayId: userId,
    })
    .onConflictDoNothing()
    .returning();

  const newProduct: Product = {
    id: temp.displayId,
    productName: temp.productName,
    productDescription: temp.productDescription,
    sellerDisplayId: temp.sellerdisplayId,
  }

    return newProduct;
}

const addProductDetailSchema = z.object({
  productId: z.string(),
  productQuantity: z.number(),
  productPrice: z.number(),
  productColor: z.string(),
  productSize: z.string().optional(),
  productImageLink: z.string().url(),
});

export async function addProductDetail(
  productId: ProductDetail["id"],
  productQuantity: ProductDetail["quantity"],
  productPrice: ProductDetail["price"],
  productStyle: ProductDetail["style"],
  productImageLink: ProductDetail["imageLink"],
  productSize?: ProductDetail["size"],
  ) {

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  try {
    addProductDetailSchema.parse({
      productId: productId,
      productQuantity: productQuantity,
      productPrice: productPrice,
      productStyle: productStyle,
      productSize: productSize,
      productImageLink: productImageLink,
    });
  } catch (error) {
    alert("There's something wrong with the input for adding product. Please try again!");
  }

  const [temp] = await db
    .insert(productDetailTable)
    .values({
      productId: productId,
      productQuantity: productQuantity,
      productPrice: productPrice,
      productStyle: productStyle,
      productSize: productSize,
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
    size: temp.productSize ?? "",
  }

  return newProductDetail;
}
