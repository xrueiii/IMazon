import { z } from "zod";
import { db } from "@/db";
import { productTable } from "@/db/schema";
//import type { Product } from "@/lib/types";
import { type NextRequest, NextResponse } from "next/server";

const addProductSchema = z.object({
  userId: z.string(),
  productName: z.string().min(1).max(100),
  productDescription: z.string().min(1).max(300),
});

type addProductRequest = z.infer<typeof addProductSchema>

export async function POST(request: NextRequest) {
    const data = await request.json();
  try {
    addProductSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId ,productName, productDescription } = data as addProductRequest;

  try{
    const [temp] = await db
    .insert(productTable)
    .values({
        productName: productName,
        productDescription: productDescription,
        sellerdisplayId: userId,
    })
    .onConflictDoNothing()
    .returning()
    .execute();

    

    return temp.displayId;
  } catch(error) {
    return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      );
  }
};



