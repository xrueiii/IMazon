import Image from "next/image";

export default function Product() {
    return (
        <div className="flex-col p-6 border rounded-md gap-2">
            <Image src="/productTest.jpg" alt="product_pic" width={300} height={300}></Image>
            <div className="flex justify-between mt-2">
                <p>Product name</p>
                <p className="text-lg font-semibold">$81</p>
            </div>
            
            <p className="text-gray-500 text-sm">Quantity: 52</p>
        </div>
    );
}