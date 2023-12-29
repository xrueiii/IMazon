"use client";

import { useState } from "react";

import ReviewInput from "./ReviewInput";

function ProductReview() {
  const [review, setReview] = useState<string>("");
  return <ReviewInput value={review} setValue={setReview} />;
}

export default ProductReview;
