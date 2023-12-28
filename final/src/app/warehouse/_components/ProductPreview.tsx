import Image from "next/image";
import { getProductDetails } from "./action";
import Link from "next/link";

type ProductPreviewProps = {
    productId: string;
    productName: string;
}

export default async function ProductPreview({productId, productName}: ProductPreviewProps) {
    const productDetails = await getProductDetails(productId);
    let minPrice = Infinity;
    let totalQuantity = 0;
    let totalSold = 0;
    for (let i = 0; i < productDetails.length; i++) {
        if (parseInt(productDetails[i].price) < minPrice) {
            minPrice = parseInt(productDetails[i].price);
        }
        totalQuantity += productDetails[i].quantity;
        totalSold += productDetails[i].sold ?? 0;
    }
    return (
        <Link href={{
            pathname: `/warehouse/product`,
          }}>
            <div className="flex-col p-6 border-2 rounded-md gap-2 items-center">
                <Image src="/productTest.jpeg" alt="product_pic" width={250} height={50}></Image>
                <div className="flex justify-between mt-2">
                    <p>{productName}</p>
                    <p className="text-lg font-semibold">{"NTD " + minPrice}</p>
                </div>
                
                <div className="flex justify-between mt-2">
                    <p className="text-gray-500 text-sm">Quantity: {totalQuantity}</p>
                    <p className="text-gray-500 text-sm">Sold: {totalSold}</p>
                </div>
            </div>
        </Link>
    );
}