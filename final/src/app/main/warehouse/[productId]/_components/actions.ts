"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { productDetailTable, productTable } from "@/db/schema";

export async function getProductPhotos(productId: string) {
  console.log(productId);
  const productPhotos = await db.query.productDetailTable.findMany({
    where: eq(productDetailTable.productId, productId),
    columns: { productImageLink: true, productStyle: true },
  });

  return productPhotos;
}

export async function editProductName(
  productId: string,
  name: string,
  description: string,
) {
  await db
    .update(productTable)
    .set({ productName: name, productDescription: description })
    .where(eq(productTable.displayId, productId))
    .returning();
  // revalidatePath(`/main/warehouse/${productId}`);
}

export async function editProductDetail(
  productId: string,
  price: string,
  style: string,
  imageLink: string,
  quantity: number,
  styleId: string,
) {
  console.log(styleId);
  await db
    .update(productDetailTable)
    .set({
      productPrice: price,
      productImageLink: imageLink,
      productQuantity: quantity,
      productStyle: style,
    })
    .where(eq(productDetailTable.displayId, styleId))
    .returning();
  revalidatePath(`/main/warehouse/${productId}`);
}

// export async function getAllStyleId(productId: string) {
//   const [styleId] = await db.query.productDetailTable.findMany({
//     where: eq(productDetailTable.productId, productId),
//     columns: {
//       displayId: true,
//     },
//   });

//   return styleId;
// }

export async function getProductDetail(productId: string) {
  console.log(productId);
  const productDetail = await db.query.productDetailTable.findMany({
    where: eq(productDetailTable.productId, productId),
    columns: {
      productPrice: true,
      productStyle: true,
      productQuantity: true,
      productImageLink: true,
      displayId: true,
    },
  });

  return productDetail;
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
