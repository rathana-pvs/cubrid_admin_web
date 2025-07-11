import React, { useState } from "react";
import {Modal, Tabs, Form, Input, Table, Button, Menu, Divider, Row, Col} from "antd";
import styles from "@/components/ui/dialogs/dialog.module.css";
import {nanoid} from "nanoid";
import Broker from "@/components/ui/dialogs/property/Broker";
import {useSelector} from "react-redux";
import CommonParam from "@/components/ui/dialogs/property/CommonParam";
import Common from "@/components/ui/dialogs/property/Common/Common";
const { TabPane } = Tabs;

const screenData = {
    broker: {screen: <Broker />},
    common: {screen: <Common/>}

}

export default function (){
    const {property} = useSelector((state) => state.dialog);
    const [screen, setScreen] = useState("");


    const menuItem = [
        {
            label: "Configuration Parameters",
            key: "config",
            children: [
                {label: "Server Common Parameters", key: "common", onClick: () => setScreen("common"),},
                {label: "Broker", key: "broker", onClick: () => setScreen("broker"),},
                {label: "Check Non-Digits", key: "digit", onClick: () => setScreen("digit"),},
            ]
        }
    ]
    return (
        <Modal
            title="Brokers"
            open={property.open}
            // onOk={onOk}
            // onCancel={onCancel}
            footer={null}
            width={1080}
        >
            <div className={styles.property__layout}>
                <div className={styles.property__layout__menu}>
                    <Menu
                        // onClick={onClick}
                        mode="inline"
                        inlineC
                        items={menuItem}
                    />
                </div>
                {screenData[screen]?.screen}
            </div>
        </Modal>
    );
};

