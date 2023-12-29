"use client"

import { useRef } from "react";
import { postComment } from "./actions";
import { useRouter } from "next/navigation";

type ReviewInputProps = {
  userId: string;
  productId: string;
}

export default function ReviewInput({ userId, productId }: ReviewInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSendComment = async() => {
    const commentContent = inputRef.current?.value;
    if (!commentContent) {
      alert("Please fill in some content");
      return;
    }
      
    await postComment(productId, userId, commentContent);
    inputRef.current.value = "";
    router.refresh();
  }

  return (
    <div className="flex h-12 w-full px-5 mt-2 justify-between">
      <input
        placeholder="Aa"
        className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-3/4 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
        name="productReview"
        ref={inputRef}
      />
      <button
        className="h-9 rounded-md border-2 bg-teal-900 px-4 text-white hover:bg-teal-700"
        type="submit"
        onClick={handleSendComment}
      >
        Send
      </button>
    </div>
  );
}

