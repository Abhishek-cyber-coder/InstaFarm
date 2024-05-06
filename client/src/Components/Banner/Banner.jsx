import React from "react";
import bannerImg from "../../../public/Images/banner.jpg";
import Image from "next/image";
function Banner() {
  return <Image src={bannerImg} alt="Banner image" width={700} priority />;
}

export default Banner;
