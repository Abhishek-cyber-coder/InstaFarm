import React, { useEffect, useState } from "react";
import styles from "./InvoiceDetail.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchInvoiceByIdAsync,
  selectSelectedInvoice,
} from "../../Features/Invoice/invoiceSlice";

function InvoiceDetail({ invoiceId }) {
  const dispatch = useDispatch();

  const [invoiceProducts, setInvoiceProducts] = useState(null);
  const invoice = useSelector(selectSelectedInvoice);

  useEffect(() => {
    if (invoiceId) {
      dispatch(fetchInvoiceByIdAsync(invoiceId));
    }
  }, [dispatch, invoiceId]);

  useEffect(() => {
    if (invoiceId && invoice) {
      const { items } = invoice;
      setInvoiceProducts(items);
    }
  }, [invoiceId, invoice]);

  return (
    <div style={{ marginTop: "6rem" }} className={styles.checkoutContainer}>
      <div className={styles.checkoutRow}>Invoice</div>
      <div className={styles.checkoutBox}>
        <div className={styles.leftContainer}>
          <div className={styles.leftFirstRow} id={styles.commonRow}>
            <div className={styles.boxContainer}>
              <p>1. Name: {invoice?.user?.name}</p>
            </div>
            <div className={styles.boxContainer}>
              <p>2. Delivery address: {invoice?.user?.address}</p>
            </div>
          </div>
          <hr />
          <div className={styles.leftThirdRow} id={styles.commonRow}>
            <div className={styles.boxContainer}>
              <p>3. Review items and delivery</p>
            </div>
            <div className={styles.boxContainer}>
              <div className={styles.imagesContainer}>
                {invoiceId &&
                  invoiceProducts &&
                  invoiceProducts.map((item, index) => (
                    <img
                      src={item?.product?.images[0]}
                      alt="Product Image"
                      key={index}
                      className={styles.img}
                    />
                  ))}
              </div>
              <div id={styles.deliveryTime}>
                Estimated delivery : <br />
                Monday — FREE Standard Delivery
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className={styles.rightContainer}>
          {!false && (
            <div className={styles.placeOrderBox}>
              <div className={styles.thirdRow}>
                <span>Total Credits :</span>
                <span>{invoice?.orderTotal}</span>
              </div>
            </div>
          )}
          {/* TODO: False->mobileView */}
          {false && (
            <div className={styles.placeOrderBox}>
              <div className={styles.secondRow}>
                <p>Order Summary</p>
                <div>
                  <span>Total credits :</span>
                  <span>{invoice?.orderTotal}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;
