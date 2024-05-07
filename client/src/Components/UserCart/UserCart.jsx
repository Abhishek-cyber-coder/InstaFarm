import React from "react";
import styles from "./UserCart.module.css";
import bagImg from "../../../public/Images/bagImg.png";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
// import prevArrow from "../../assets/icon/prevArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCartDetail } from "@/Features/Cart/cartSlice";
import CartProducts from "../CartProducts/CartProducts";
import { useRouter } from "next/router";
import Image from "next/image";
import { selectUserCredits } from "@/Features/Credit/creditSlice";
import { addInvoiceAsync } from "@/Features/Invoice/invoiceSlice";
import { deleteCartItemsAsync } from "@/Features/Cart/cartSlice";
import { deductCreditsApi } from "@/apis/credit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserCart({ mobileView }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const userCredits = useSelector(selectUserCredits);
  const cart = useSelector(selectCartDetail);

  const placeOrder = () => {
    // Check if user has enough credits to place the order
    if (cart && cart.totalCredits > userCredits) {
      // If user doesn't have enough credits, display a message and prevent placing the order
      toast.error("You don't have enough credits");
    } else {
      let invoiceData = {
        items: cart?.items,
        orderTotal: cart?.totalCredits,
      };
      dispatch(addInvoiceAsync(invoiceData))
        .then(async () => {
          let deductCredits = cart?.totalCredits;
          await deductCreditsApi({ deductCredits });
        })
        .then(() => dispatch(deleteCartItemsAsync()))
        .then(() => router.push("/order_success"));
    }
  };

  return (
    // TODO: false->mobileview
    <div
      style={false ? { marginTop: "90px" } : { marginTop: `6rem` }}
      className={styles.userCart}
    >
      <div className={styles.buttonRow}>
        {/* TODO: false->mobileview */}
        {false ? (
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={prevArrow} alt="Prev arrow" />
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            Back to products
          </button>
        )}
      </div>

      {/* TODO: false->mobileview */}
      {!false && (
        <div className={styles.userCartRow}>
          <Image className="w-10" src={bagImg} alt="Bag icon" />
          <span>My Cart</span>
        </div>
      )}
      <div className={styles.cartContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftUpperBox}>
            {/* TODO: false->mobileview */}
            {!false &&
              cart?.items?.map((item, index) => {
                return (
                  <CartProducts
                    key={index}
                    productDetails={item?.product}
                    quantity={item?.quantity}
                    price={item?.price}
                    credits={item?.credits}
                  />
                );
              })}

            {/* TODO: false->mobileview */}
            {false &&
              cart?.items?.map((item, index) => (
                <div className={styles.cartProduct} key={index}>
                  <img src={item?.product?.images[0]} alt="Product Image" />
                  <div className={styles.detailsRow}>
                    <p>{item?.product?.title}</p>
                    <h4>₹{item?.product?.price}</h4>
                    <span>Color : {item?.product?.color}</span>
                    <span>In Stock</span>
                  </div>
                </div>
              ))}
            {/* TODO: false->mobileview */}
            {false && (
              <div className={styles.mobileTotalPrice}>
                <div>
                  <p>Total credits:</p>
                  <p>₹{cart?.totalCredits || 0}</p>
                </div>
              </div>
            )}
          </div>

          {/* TODO: false->mobileview */}
          {!false && (
            <div className={styles.leftLower}>
              <span className={styles.totalItems}>
                {cart?.totalItems || "No"} Items
              </span>
              <span className={styles.totalPrice}>
                <BoltRoundedIcon />
                {cart?.totalCredits || 0}
              </span>
            </div>
          )}
          {/* TODO: false->mobileView */}
          {false && (
            <div className={styles.leftLower}>
              <span>
                Total Credits{" "}
                <b>
                  <BoltRoundedIcon /> {cart?.totalCredits || 0}
                </b>
              </span>
              <button onClick={placeOrder}>PLACE ORDER</button>
            </div>
          )}
        </div>
        {/* TODO: false->mobileView */}
        {!false && (
          <div className={styles.rightContainer}>
            <div className={styles.rightUpperBox}>
              <div className={styles.priceDetails}>
                <div>PRICE DETAILS</div>
                <span>
                  <p>Total Credits</p>{" "}
                  <p>
                    <BoltRoundedIcon /> {cart?.totalCredits}
                  </p>
                </span>
              </div>
              <div className={styles.priceDetails}>
                <div>
                  <p>Total Credits</p>
                  <p>
                    <BoltRoundedIcon />
                    {cart?.totalCredits}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.rightLower}>
              <button onClick={placeOrder}>PLACE ORDER</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCart;
