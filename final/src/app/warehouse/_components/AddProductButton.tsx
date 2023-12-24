"use client";

import { useRouter } from "next/navigation";

export default function AddProductButton() {
    const router = useRouter();
    const handleOnClick = () => {
        router.push("/warehouse/AddProduct")
    }
    return (<button onClick={handleOnClick} className="text-4xl rounded-full hover:bg-slate-100 px-2">+</button>);
}