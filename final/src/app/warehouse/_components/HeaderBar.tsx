import { auth } from "@/lib/auth";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

export default async function HeaderBar() {
    const session = await auth();
    return (
    <div className="flex w-full bg-teal-900 py-8 border-4 rounded-t-xl border-slate-200 justify-between px-8">
        <div className="flex items-end">
            <Image src="/IMazon.ico" alt="IMazon icon" width={40} height={20}/>
            <p className="font-semibold ml-2 text-white text-4xl">Imazon</p>
            <p className="text-white ml-10 italic tracking-wider">Welcome, {session?.user?.name}!</p>
        </div>
        <SignOutButton/>
    </div>
    );
}