import {setLocalStorage} from "@/utils/storage";
import {Dropdown} from "antd";
import styles from "@/components/ui/header/header.module.css";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setConnection} from "@/state/dialogSlice";
import {deleteServer} from "@/state/serverSlice";
import {useTranslations} from "next-intl";
import {serverDisconnect} from "@/state/sharedAction";




export default function (){
    const t = useTranslations()
    const selectedObject = useSelector(state => state.general.selectedObject);
    const disabled = selectedObject.type !== "server";
    const connection = useSelector(state => state.dialog.connection);
    const dispatch = useDispatch();
    const menus = [
        {
            label: 'Add Host',
            onClick: () => dispatch(setConnection({open: true, type: "add"})),
        },
        {
            label: 'Change Host Info',
            disabled,
            onClick: () => dispatch(setConnection({open: true, type: "edit", serverId: selectedObject.serverId})),
        },
        {
            label: 'Export Host Info',
        },
        {
            label: 'Disconnect Host Connection',
            disabled,
            onClick: ()=>{dispatch(serverDisconnect())}
        },
        {
            label: 'Delete Host',
            disabled,
            onClick: ()=>{
                dispatch(deleteServer(selectedObject.id));
            }

        },
        {
            label: 'Close Current & All Window',
        },
        {
            label: 'Import Workspace',
            disabled: true
        },
        {
            label: 'Change Workspace',
            disabled: true
        },
        {
            label: 'Basic Info',
            children: [
                {
                    label: 'Basic Info',
                    disabled: true
                },
            ]
        },
        {
            label: 'Termination'
        },
        {
            label: 'User Management'
        },
    ];

    return (
        <Dropdown menu={{items: menus}}>
            <div className={styles.dropdown__menu} onClick={(e) => e.preventDefault()}>
                {t("header.title.file")}
            </div>
        </Dropdown>
    )
}