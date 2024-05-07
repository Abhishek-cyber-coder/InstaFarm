import React from "react";

import styles from "./OrderSuccess.module.css";
import partyImg from "../../../public/Images/partyImg.png";
import { useRouter } from "next/router";
import Image from "next/image";
function OrderSuccess() {
  const router = useRouter();
  return (
    <div className={styles.order}>
      <div className={styles.orderContainer}>
        <div className={styles.orderBox}>
          <Image src={partyImg} height={100} width={100} alt="Party Image" />
          <span>Order is placed successfully!</span>
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            Go back to Home page
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
