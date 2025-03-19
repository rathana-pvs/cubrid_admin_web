import React, {useEffect} from 'react';
import {Col, Row} from 'antd';
import Header from "@/components/ui/header/Header";
import styles from "./connection.module.css";
import NewConnection from "@/components/ui/create-connection/NewConnection";
import {ConnectionProvider, useConnectionContext} from "@/context/AppContext";
import {getLocalStorage} from "@/utils/storage";
import ConnectionCard from "@/components/ui/connection-card/ConnectionCard";


const ConnectionPage = () => {
    const {state, dispatch} = useConnectionContext();

    useEffect(()=>{
        const connections = getLocalStorage("connections");
        dispatch({type:"CONNECTION_DATA", payload:connections??[]});

    },[])
    console.log(state)
    return (
        <>
                <Header/>
                <div className={styles.layout}>
                    <div className={styles.layout__wrapper}>
                        <Row gutter={[24, 24]}>
                            {state.connection_data.map((connection, index) => (
                                <Col key={index} xs={24} sm={24} md={12} lg={12} xl={8}>
                                    <ConnectionCard {...connection} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <NewConnection open={true}/>
                </div>

        </>

    );
};
const Connection = () => (
    <ConnectionProvider>
        <ConnectionPage/>
    </ConnectionProvider>
)

export default Connection;

