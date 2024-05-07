import CashFree from "@/Components/CashFree/CashFree";
import React from "react";

export default function PaymentPage() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <div className="font-bold text-2xl text-red-400">
        You can add 1 credit per ₹50
      </div>
      <CashFree />
    </div>
  );
}
