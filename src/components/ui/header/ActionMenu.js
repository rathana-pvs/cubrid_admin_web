import {Dropdown} from "antd";
import styles from "@/components/ui/header/header.module.css";
import React from "react";
import {useDispatch, useSelector} from "react-redux";





export default function (){
    const selectedObject = useSelector(state => state.general.selectedObject);
    const disabled = selectedObject.type !== "server";
    const connection = useSelector(state => state.dialog.connection);
    const dispatch = useDispatch();
    const menus = [
        {
            label: 'Show Host Dashboard',
        },
        {
            label: 'Server Version'
        },
        {
            label: 'Config Params',
            children: [
                {
                    label: 'Attribute Config Parameter(DB)'
                },
                {
                    label: 'Attribute Config Parameter(Broker)'
                }
            ]
        },

    ];

    return (
        <Dropdown menu={{items: menus}}>
            <div className={styles.dropdown__menu} onClick={(e) => e.preventDefault()}>
                Action
            </div>
        </Dropdown>
    )
}