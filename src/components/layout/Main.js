import AppLayout from "@/components/layout/AppLayout";
import {Layout} from "antd";
import AppBar from "@/components/layout/AppBar";
import React, {useEffect, useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import NewConnection from "@/components/ui/create-connection/NewConnection";
import DBLogin from "@/components/ui/db-login/DBLogin";
import Header from "@/components/ui/header/Header";
import { IntlProvider } from 'next-intl'


export default function (props) {
    const [locale, setLocale] = useState('en')
    const [messages, setMessages] = useState({})

    useEffect(() => {
        import(`@/locales/${locale}.json`).then(res => setMessages(res.default))
    }, [locale])

    if (!Object.keys(messages).length) return null;
    return(
        <IntlProvider locale={locale} messages={messages}>
            <Layout>
                <Header setLocale={setLocale}/>
                {/*<AppBar/>*/}
               <Layout className={"main__container"}>
                   <Sidebar/>
                   <main className="main__content">
                       {props.children}
                   </main>
               </Layout>
                <NewConnection/>
                <DBLogin/>
            </Layout>
        </IntlProvider>

    )
}