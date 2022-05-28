import "../styles/globals.css";
import "../styles/index.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				></meta>
				<title>太和文档</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
