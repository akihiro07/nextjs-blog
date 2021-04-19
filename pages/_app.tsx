import {AppProps} from "next/app";
// golbal CSS
import "../styles/global.css";

export default function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
