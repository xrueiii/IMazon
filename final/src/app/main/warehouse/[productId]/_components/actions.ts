"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { commentsTable, productDetailTable, productTable } from "@/db/schema";

export async function getProductPhotos(productId: string) {
  console.log(productId);
  const productPhotos = await db.query.productDetailTable.findMany({
    where: eq(productDetailTable.productId, productId),
    columns: { productImageLink: true, productStyle: true },
  });

  return productPhotos;
}

export const deleteProduct = async (productId: string) => {
  console.log("[deleteProduct]");
  await db.delete(productTable).where(eq(productTable.displayId, productId));
  return;
};

export async function getProductDetail_1(productId: string) {
  console.log(productId);
  const [productDetail] = await db.query.productTable.findMany({
    where: eq(productTable.displayId, productId),
    columns: {
      productName: true,
      productDescription: true,
      sellerdisplayId: true,
    },
  });

  return productDetail;
}

export async function getProductDetail_2(productId: string) {
  console.log(productId);
  const productDetail = await db.query.productDetailTable.findMany({
    where: eq(productDetailTable.productId, productId),
    columns: {
      productQuantity: true,
      productSold: true,
      productPrice: true,
      productStyle: true,
    },
  });

  return productDetail;
}

export async function postComment(productId: string, userId: string, content: string, rate: number) {
  console.log(productId);
  await db.insert(commentsTable).values({
    userId: userId,
    productId: productId,
    content: content,
    rate: rate,
  }).execute();

  return;
}
