import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

type Pageprops = {
  searchParams: {
    searchName: string;
  };
};

export default async function WarehousePage({
  searchParams: { searchName },
}: Pageprops) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  

  return (
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
      shop test {searchName}
    </main>
  );
}
