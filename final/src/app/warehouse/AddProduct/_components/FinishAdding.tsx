import { FormEvent } from "react";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

// Import FormEvent type from React
import useProducts from "@/hooks/useProduct";
import { publicEnv } from "@/lib/env/public";

export default function FinishAdding() {
  const { addProduct, addProductDetail } = useProducts();
  const router = useRouter();
  const session = useSession();
  const userId = session?.data?.user?.id;
  const productName = "wine";
  const productDescription = "good";
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const handleFinish = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      console.log("start trying");
      const newProductId = await addProduct(
        userId,
        productName,
        productDescription,
      );
      console.log(newProductId);
      await addProductDetail(
        newProductId,
        11,
        "123",
        "blue",
        "https://www.google.com/search?q=how+to+unmerge+merge+branches+in+git&rlz=1C1YTUH_zh-TWTW1024TW1024&oq=merge+unmerge+branch&gs_lcrp=EgZjaHJvbWUqCggBEAAYCBgNGB4yBggAEEUYOTIKCAEQABgIGA0YHtIBCjEwOTMxajFqMTWoAgCwAgA&sourceid=chrome&ie=UTF-8",
      );
      // router.push("/warehouse");
      // Additional logic or redirection can be added here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleFinish} // Attach the handler to the onSubmit event
      className="mb-3 w-full rounded-lg border-2 bg-teal-900 py-1 text-center text-sm text-white hover:bg-teal-700"
    >
      <button data-testid="add-submit-button" type="submit">
        Finish
      </button>
    </form>
  );
}
