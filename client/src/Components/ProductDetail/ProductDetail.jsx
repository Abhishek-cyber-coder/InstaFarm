import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
// import starIcon from "../../assets/icon/starIcon.svg";
// import prevArrow from "../../assets/icon/prevArrow.svg";
import { getProductByIdApi } from "@/apis/product";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageData } from "@/utils/helper";
import { addToCartAsync, addedToCart } from "@/Features/Cart/cartSlice";
import { useRouter } from "next/router";
function ProductDetails({ productId, mobileView }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = getLocalStorageData("isAuthenticated");

  const [product, setProduct] = useState(null);

  const handleBuyNow = (productId, quantity) => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      dispatch(addToCartAsync({ productId, quantity })).then(() => {
        router.push("/cart");
      });
    }
  };

  const getProductById = async (productId) => {
    const response = await getProductByIdApi(productId);
    setProduct(response);
  };

  const handleAddToCart = (productId, quantity) => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      dispatch(addToCartAsync({ productId, quantity })).then(() => {
        dispatch(addedToCart());
      });
    }
  };

  useEffect(() => {
    getProductById(productId);
  }, [dispatch]);

  return (
    <div style={{ marginTop: "6rem" }} className={styles.mainContainer}>
      <div className={styles.buttonRow}>
        {/* TODO: false->mobileView*/}
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

      {/* TODO: false->mobileView */}
      {false && (
        <button
          className={styles.buyNowButton}
          onClick={() => {
            handleBuyNow(product?._id, 1);
          }}
        >
          Buy Now
        </button>
      )}
      {!mobileView && (
        <div className={styles.productHeading}>{product?.heading}</div>
      )}
      <div className={styles.productDetails}>
        {/* TODO: false->mobileView */}
        {!false && (
          <div className={styles.imgContainer}>
            <img src={product?.images[0]} alt="" />
          </div>
        )}

        {/* {mobileView && <ImageCarousel images={product?.images} />} */}
        <div className={styles.details}>
          <p className={styles.productName}>{product?.name}</p>
          {/* TODO: false->mobileView */}
          {false && (
            <div className={styles.productfeatures}>{product?.heading}</div>
          )}
          <p className={styles.priceRow}>Price - ₹ {product?.price}</p>
          <p className={styles.priceRow}>
            Required credits{" "}
            <BoltRoundedIcon className="bg-yellow-400 rounded-full" />{" "}
            {product?.calculatedCredits}
          </p>
          <div className={styles.description}>
            <ul>
              About this item
              {product?.description?.split(".")?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <p className={styles.priceRow}>
            Available - <span>In stock</span>
          </p>
        </div>
      </div>
      {/* TODO: FALSE->mobileView */}
      {!false && (
        <div className={styles.bottomRow}>
          <div className={styles.bottomImgContainer}>
            {product?.images?.slice(1, 4)?.map((img, index) => (
              <div className={styles.subImg} key={index}>
                <img src={img} alt="image" />
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.addToCartButton}
              onClick={() => {
                handleAddToCart(product?._id, 1);
              }}
            >
              Add to cart
            </button>
            <button
              className={styles.buyNowButton}
              onClick={() => {
                handleBuyNow(product?._id, 1);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
      {/* TODO: False->MobileView */}
      {false && (
        <>
          <div className={styles.buttonContainer}>
            <button
              className={styles.addToCartButton}
              onClick={() => {
                handleAddToCart(product?._id, 1);
              }}
            >
              Add to cart
            </button>
            <button
              style={{ marginBottom: "7rem" }}
              className={styles.buyNowButton}
              onClick={() => {
                handleBuyNow(product?._id, 1);
              }}
            >
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
