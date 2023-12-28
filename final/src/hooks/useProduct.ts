import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import type { Product, ProductDetail } from "@/lib/types";
import { redirect } from "next/navigation";
import { useState } from "react";



export default function useProducts() {
    const [loading, setLoading] = useState(false);
    const addProduct = async(productName: Product["productName"],
        productDescription: Product["productDescription"],
        ) => {
      
      const session = await auth();
      const userId = session?.user?.id;
      if (!userId) {
        redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
      }
      setLoading(true);
      try {
        const res = await fetch("/api/product/Post", {
          method: "POST",
          body: JSON.stringify({userId ,productName, productDescription}),
            headers: {
              "Content-Type": "application/json",
            },
        });
    
        const data = await res.json();

        setLoading(false);
        return data;
      }catch(error){
        console.log(error);
      }
    };
    
    
    const addProductDetail = async(
      productId: ProductDetail["id"],
      productQuantity: ProductDetail["quantity"],
      productPrice: ProductDetail["price"],
      productStyle: ProductDetail["style"],
      productImageLink: ProductDetail["imageLink"],
      ) => {
        
      const session = await auth();
      const userId = session?.user?.id;
      if (!userId) {
        redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
      }
    
      try {
        const res = await fetch("/api/detail/Post", {
          method: "POST",
          body: JSON.stringify({productId ,productQuantity, productPrice, productStyle, productImageLink}),
            headers: {
              "Content-Type": "application/json",
            },
        });
    
        const data = await res.json();

        setLoading(false);
        return data;
      }catch(error){
        console.log(error);
      }
    
    }

    return ({
        loading,
        addProduct,
        addProductDetail,
    })
}