import "../styles/index.scss"
import type { AppProps /*, AppContext */ } from "next/app"
import React, { PropsWithChildren } from "react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import Head from "next/head"
import { useRouter } from "next/dist/client/router"

export default function App({ Component, pageProps }: AppProps<PropsWithChildren<{}>>) {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>co-flex</title>
                <meta name="description" content="Architecting shared applications using js & node.js."></meta>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/svg+xml" href="/icon.svg" />
                <link rel="mask-icon" href="/icon.svg" color="#fff" />
            </Head>
            <div className="d-flex flex-column fullscreen">
                {router.asPath.includes("gallery") ? (
                    <Component {...pageProps} />
                ) : (
                    <>
                        <Header selectedIndex={-1} />
                        <div className="container-lg p-3">
                            <Component {...pageProps} />
                        </div>
                        <Footer />
                    </>
                )}
            </div>
        </>
    )
}
