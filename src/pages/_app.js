import "../styles/globals.css";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "../utils/theme";
import { useSelector, useStore } from "react-redux";
import { useMemo } from "react";
import { wrapper } from "../store/index";
import { PersistGate } from "redux-persist/integration/react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }) {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const store = useStore((state) => state);

  return (
    <PersistGate loading={null} persistor={store.__persister}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </ProSidebarProvider>
      </ThemeProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
