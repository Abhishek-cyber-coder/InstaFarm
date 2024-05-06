"use client";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAsync,
  selectAllProducts,
  selectIsLoading,
} from "@/Features/Product/productSlice";

function Products() {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 pt-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        allProducts?.map((product, index) => {
          return <ProductCard key={index} productDetails={product} />;
        })
      )}
    </div>
  );
}

export default Products;
