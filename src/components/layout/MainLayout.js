
import {Layout} from "antd";
import React, {useEffect, useState} from "react";
import { IntlProvider } from 'next-intl'

// import {useAppContext} from "@/context/AppContext";

import NavBar from "@/components/layout/nav-bar/NavBar";
import SideNavigation from "@/components/layout/side-navigation/SideNavigation";
import NewConnection from "@/components/ui/dialogs/NewConnection";
import UserManagement from "@/components/ui/dialogs/user-management/UserManagement";
import CreateUserDB from "@/components/ui/dialogs/CreateUserDB";
import LoginDatabase from "@/components/ui/dialogs/LoginDatabase";
import CompactDB from "@/components/ui/dialogs/CompactDB";
import CheckDB from "@/components/ui/dialogs/CheckDB";
import BackupDB from "@/components/ui/dialogs/BackupDB";
import OptimizeDB from "@/components/ui/dialogs/OptimizeDB";
import CopyDB from "@/components/ui/dialogs/CopyDB";
import DeleteDB from "@/components/ui/dialogs/DeleteDB";
import RenameDB from "@/components/ui/dialogs/RenameDB";
import RestoreDB from "@/components/ui/dialogs/RestoreDB";
import PlanDump from "@/components/ui/dialogs/PlanDump";
import ChangeCMPassword from "@/components/ui/dialogs/ChangeCMPassword";
import ParamDump from "@/components/ui/dialogs/ParamDump";
import Property from "@/components/ui/dialogs/property/Property";
import AboutCubrid from "@/components/ui/dialogs/AboutCubrid";
import Version from "@/components/ui/dialogs/Version";


export default function (props) {
    const [locale, setLocale] = useState('en')
    const [messages, setMessages] = useState({})

    useEffect(() => {
        import(`@/locales/${locale}.json`).then(res => setMessages(res.default))
    }, [locale])

    // useEffect(()=>{
    //     dispatch({type: "LOADING_SCREEN", payload: false})
    // },[])

    if (!Object.keys(messages).length) return null;
    return(
        <IntlProvider locale={locale} messages={messages}>
            <Layout>
                <NavBar setLocale={setLocale}/>
                {/*<AppBar/>*/}
                <Layout className={"main__container"}>
                    <SideNavigation/>
                    <main className="main__content">
                        {props.children}
                    </main>
                </Layout>
                <NewConnection/>
                <UserManagement/>
                <CreateUserDB/>
                <LoginDatabase/>
                <CompactDB/>
                <CheckDB/>
                <BackupDB/>
                <OptimizeDB/>
                <CopyDB/>
                <DeleteDB/>
                <RenameDB/>
                <RestoreDB/>
                <PlanDump/>
                <ParamDump/>
                <ChangeCMPassword/>
                <Property/>
                <AboutCubrid/>
                <Version/>
                {/*<DBLogin/>*/}
                {/*<LoadingScreen/>*/}
                {/*<CreateDatabase/>*/}
                {/*<UserManagement/>*/}
            </Layout>
        </IntlProvider>

    )
}