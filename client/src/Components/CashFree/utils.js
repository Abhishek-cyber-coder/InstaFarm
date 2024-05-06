import { load } from "@cashfreepayments/cashfree-js";

export async function getCashfree() {
  try {
    const cashfree = await load({
      mode: "sandbox", // or production
    });
    return cashfree;
  } catch (error) {
    console.error("Error loading Cashfree:", error);
    return null;
  }
}
