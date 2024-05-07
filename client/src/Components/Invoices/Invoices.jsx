import React, { useEffect } from "react";
import styles from "./Invoices.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  fetchInvoicesAsync,
  selectAllInvoices,
} from "../../Features/Invoice/invoiceSlice";
import { getLocalStorageData } from "../../utils/helper";
function Invoices({ mobileView }) {
  const userName = getLocalStorageData("name");
  const dispatch = useDispatch();
  const router = useRouter();

  const invoices = useSelector(selectAllInvoices);

  const handleGetInvoice = (invoiceId) => {
    router.push(`/invoice/${invoiceId}`);
  };

  useEffect(() => {
    dispatch(fetchInvoicesAsync());
  }, [dispatch]);
  return (
    <div style={{ marginTop: "6rem" }} className={styles.mainContainer}>
      <div className={styles.buttonRow}>
        {/* TODO: false->mobileView */}
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
            Back to Home
          </button>
        )}
      </div>
      <div className={styles.invoiceHeading}>My Invoices</div>
      <div className={styles.invoicesContainer}>
        {invoices?.map((invoice, index) => (
          <div className={styles.invoiceBox} key={index}>
            <div className={styles.insideInvoiceBox}>
              <span>
                {userName}
                <br />
                <p>OrderId: {invoice?._id}</p>
              </span>
            </div>
            <button
              onClick={() => {
                handleGetInvoice(invoice?._id);
              }}
            >
              View Invoice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Invoices;
