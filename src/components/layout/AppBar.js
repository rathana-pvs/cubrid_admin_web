import {Button, Layout, Menu} from "antd";
import React from "react";
import styles from "@/components/layout/layout.module.scss";
import {useAppContext} from "@/context/AppContext";


function AppBar(props) {
    const {state, dispatch} = useAppContext()

    return(

            <div className={styles.appbar}>
                <div  className={styles.logo__wrapper}>
                    <img className={styles.logo} src="https://avatars.githubusercontent.com/u/358322?s=200&v=4" alt="Avatar" />
                    <div className={styles.logo__title}>CUBRID</div>
                </div>

                <div className={styles.appbar__menu__container}>
                    <Button className={styles.appbar__menu__button} onClick={()=>dispatch({type:"CREAT_CONNECTION_STATE", payload:true})}>
                        <img src={"/add-host.png"} alt={"add host"}/>
                        <div>Host</div>
                    </Button>
                    <Button className={styles.appbar__menu__button}>
                        <i className="fa-light fa-play"></i>
                        <div>Play</div>
                    </Button>
                    <Button className={styles.appbar__menu__button}>
                        <i className="fa-light fa-table-tree"></i>
                        <div>Schema</div>
                    </Button>
                    <Button className={styles.appbar__menu__button}>
                        <img src={"/transactional-data.png"} alt={"data-precessing"}/>
                        <div>Data</div>
                    </Button>
                    <Button className={styles.appbar__menu__button}>
                        <i className="fa-light fa-gear"></i>
                        <div>Tool</div>
                    </Button>
                    <Button className={styles.appbar__menu__button}>
                        <i className="fa-light fa-user"></i>
                        <div>User</div>
                    </Button>
                    <Button className={styles.appbar__menu__button}>
                        <i className="fa-light fa-database"></i>
                        <div>Database</div>
                    </Button>
                    <Button className={styles.appbar__menu__button}>
                        <img src={"/transactional-data.png"} alt={"data-precessing"}/>
                        <div>Migration</div>
                    </Button>
                    <Button className={styles.appbar__menu__button}>
                        <i className="fa-light fa-square-question"></i>
                        <div>Help</div>
                    </Button>
                </div>
            </div>

    )
}

export default AppBar;