import { store } from "@/app/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        position="top-right"
        pauseOnHover
      />
    </Provider>
  );
}
export default App;
