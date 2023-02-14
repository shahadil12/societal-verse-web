import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store/index";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
