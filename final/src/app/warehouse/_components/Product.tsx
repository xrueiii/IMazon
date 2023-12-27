import Image from "next/image";

export default function Product() {
    return (
        <div className="flex-col p-6 border-2 rounded-md gap-2 items-center">
            <Image src="/productTest.jpeg" alt="product_pic" width={250} height={50}></Image>
            <div className="flex justify-between mt-2">
                <p>Product name</p>
                <p className="text-lg font-semibold">$81</p>
            </div>
            
            <div className="flex justify-between mt-2">
                <p className="text-gray-500 text-sm">Quantity: 52</p>
                <p className="text-gray-500 text-sm">Sold: 1</p>
            </div>
        </div>
    );
}