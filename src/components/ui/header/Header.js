import React from "react";
import styles from "./header.module.css";
import {Header} from "antd/es/layout/layout";
import Button from '@/components/ui/button/Button'
import {useConnectionContext} from "@/context/AppContext";

export default function () {
    const {dispatch } = useConnectionContext();

    return (
    <Header className={styles.header}>
        <div  className={styles.logo__wrapper}>
            <img className={styles.logo} src="https://avatars.githubusercontent.com/u/358322?s=200&v=4" alt="Avatar" />
            <div className={styles.logo__title}>CUBRID</div>
        </div>
        <div className={styles.menu__wrapper}>
            <Button onClick={()=>dispatch({type:"CREAT_CONNECTION_STATE", payload:true})}
                    className={"button button__primary"}>New Connection</Button>
        </div>
    </Header>
    )

}