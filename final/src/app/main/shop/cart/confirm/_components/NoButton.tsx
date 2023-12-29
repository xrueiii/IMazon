"use client";

import { useRouter } from "next/navigation";

export default function NoButton() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/main/shop");
  };
  return (
    <button
      onClick={handleOnClick}
      className="h-12 rounded-md border-2 bg-white px-4 hover:bg-slate-200 hover:shadow-2xl"
    >
      Cancel
    </button>
  );
}
