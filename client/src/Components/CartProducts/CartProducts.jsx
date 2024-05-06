import React from "react";
import styles from "./CartProducts.module.css";
import Select from "react-select";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { quantityOptions } from "../../utils/options";
import { quantitySelectStyles } from "@/utils/customSelectStyles";
import { useDispatch } from "react-redux";
import {
  getCartDetailsAsync,
  updateCartAsync,
} from "@/Features/Cart/cartSlice";
function CartProducts({ productDetails, quantity, price, credits }) {
  const dispatch = useDispatch();
  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartAsync({ productId, quantity })).then(() => {
      dispatch(getCartDetailsAsync());
    });
  };

  return (
    <div className={styles.cartProducts}>
      <img src={productDetails?.images?.[0]} alt="Product image" />
      <div className={styles.detailsColumn}>
        <h4>{productDetails?.name}</h4>
        <p style={{ color: "#A2A2A2" }}>In Stock</p>
      </div>
      <div className={styles.detailsColumn}>
        <h4>Credits</h4>
        <p>
          <BoltRoundedIcon /> {productDetails?.calculatedCredits}
        </p>
      </div>
      <div className={styles.detailsColumn}>
        <h4>Quantity</h4>
        <Select
          menuShouldScrollIntoView={false}
          isSearchable={false}
          placeholder={quantity}
          options={quantityOptions}
          styles={quantitySelectStyles}
          onChange={(selectedOption) => {
            handleQuantityChange(productDetails?._id, selectedOption.value);
          }}
        />
      </div>
      <div className={styles.detailsColumn}>
        <h4>Total</h4>
        <p>
          <BoltRoundedIcon /> {credits}
        </p>
      </div>
    </div>
  );
}

export default CartProducts;
