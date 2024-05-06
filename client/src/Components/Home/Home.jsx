import React from "react";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";

function Home() {
  return (
    <div className="pt-20">
      <Carousel />
      <Products />
    </div>
  );
}

export default Home;
