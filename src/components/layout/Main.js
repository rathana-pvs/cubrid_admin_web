import AppLayout from "@/components/layout/AppLayout";
import {Layout} from "antd";
import AppBar from "@/components/layout/AppBar";
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import NewConnection from "@/components/ui/create-connection/NewConnection";
import DBLogin from "@/components/ui/db-login/DBLogin";


export default function (props) {

    return(
        <Layout>
            <AppBar/>
           <Layout className={"main__container"}>
               <Sidebar/>
               <main className="main__content">
                   {props.children}
               </main>
           </Layout>
            <NewConnection/>
            <DBLogin/>
        </Layout>

    )
}