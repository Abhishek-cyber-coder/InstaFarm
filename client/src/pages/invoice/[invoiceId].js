import Header from "@/Components/Header/Header";
import InvoiceDetail from "@/Components/InvoiceDetail/InvoiceDetail";
import { useRouter } from "next/router";
export default function InvoicePage() {
  const router = useRouter();
  const { invoiceId } = router.query;
  return (
    <div>
      <Header />
      <InvoiceDetail invoiceId={invoiceId} />
    </div>
  );
}
