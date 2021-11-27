import "../styles/index.scss"
import type { AppProps /*, AppContext */ } from "next/app"
import React, { PropsWithChildren } from "react"
import Head from "next/head"
import { Header } from "../components/header"
import icon from "../public/icon.svg"
import { Footer } from "../components/footer"
import { useRouter } from "next/dist/client/router"

export default function App({ Component, pageProps }: AppProps<PropsWithChildren<{}>>) {
    const router = useRouter()
    if (router.asPath.includes("editor")) {
        return <Component {...pageProps} />
    }
    return (
        <div className="d-flex flex-column fullscreen">
            <head>
                <title>co-flex</title>
                <meta name="description" content="Architecting shared applications using js & node.js."></meta>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/svg+xml" href={icon} />
                <link rel="mask-icon" href={icon} color="#fff" />
            </head>
            <Header selectedIndex={-1} />
            <div className="container-lg p-3">
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    )
}
