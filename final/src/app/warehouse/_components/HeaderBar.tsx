import Image from "next/image";

import { auth } from "@/lib/auth";

import SignOutButton from "./SignOutButton";
import Link from "next/link";

export default async function HeaderBar() {
  const session = await auth();
  return (
    <div className="flex w-full justify-between rounded-t-xl border-4 border-slate-200 bg-teal-900 px-8 py-8">
      <div className="flex items-end">
        <Link className="flex" href={{
        pathname: `/warehouse`,
      }}>
          <Image src="/IMazon.ico" alt="IMazon icon" width={40} height={20} />
          <p className="ml-2 text-4xl font-semibold text-white">IMazon</p>
        </Link>
        
        <p className="ml-10 italic tracking-wider text-white">
          Welcome, {session?.user?.name}!
        </p>
      </div>
      <div className="flex gap-5">
        <SignOutButton />
      </div>
    </div>
  );
}
