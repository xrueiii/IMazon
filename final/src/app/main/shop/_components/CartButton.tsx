"use client";

import { useRouter } from "next/navigation";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";

export default function CartButton() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/main/shop/cart");
  };
  return (
    <IconButton onClick={handleOnClick}>
      <ShoppingCartIcon />
    </IconButton>
  );
}
