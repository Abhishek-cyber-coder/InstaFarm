import Header from "@/Components/Header/Header";
import React from "react";
import { useRouter } from "next/router";
import ProductDetails from "@/Components/ProductDetail/ProductDetail";

export default function DetailPage() {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <div>
      <Header />
      {productId && <ProductDetails productId={productId} />}
    </div>
  );
}
