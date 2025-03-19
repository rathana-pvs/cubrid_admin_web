// pages/_app.js
"use client"
import '../styles/globals.css';
import {ConfigProvider} from "antd";
import {blue} from "next/dist/lib/picocolors";
import Head from "next/head"; // Your custom global styles
import { App as AntdApp } from "antd";
import MainLayout from "../components/layout/Main";
import {AppProvider} from "@/context/AppContext";
const theme = {
    token: {
        colorPrimary: 'rgb(44, 62, 80)', // Custom primary color
        borderRadius: 4, // Global border radius
        fontSize: 13, // Default font size
        colorTextHeading:'rgb(44, 62, 80, 0.75)',
        colorText:'rgb(44, 62, 80)',


    },
    components: {
        Tree: {
            nodeHoverBg:'rgb(44, 62, 80, 0.05)',
            nodeSelectedBg: 'rgb(44, 62, 80, 0.15)',
            nodeSelectedColor: 'rgb(44, 62, 80)',
        },
        Tabs:{
            cardPaddingSM: '2px 8px',
            cardPadding: '2px 8px',
        },
        Table:{
            cellPaddingBlock: 5
        }
    },
};
function MyApp({ Component, pageProps }) {
    return (
        <>
            <AppProvider>
                <ConfigProvider theme={theme}>
                    <AntdApp>
                        <MainLayout>
                            <Component {...pageProps} />
                        </MainLayout>
                    </AntdApp>

                </ConfigProvider>
            </AppProvider>

        </>

)
    ;
}

export default MyApp;
