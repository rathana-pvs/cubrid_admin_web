import {Dropdown} from "antd";
import {
    ApiOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined, FileExcelOutlined, PicRightOutlined,
    PlusOutlined,
    UploadOutlined
} from "@ant-design/icons";
import {nanoid} from "nanoid";
import {useAppContext} from "@/context/AppContext";
import Synonyms from "@/components/ui/contents/synonyms";
import React from "react";
import CreateTable from "@/components/ui/contents/create-table";


export default function({node, event, open, onClose}) {
    const {state, dispatch} = useAppContext();
    const {clientX, clientY} = event;
    const menuItems = [
        {
            label: "Create Table",
            key: nanoid(4),
            icon: <PlusOutlined />,
            onClick: ()=>onCreateTable(),
        },
        {
            label: "Excel Export",
            key: nanoid(4),
            icon: <FileExcelOutlined />,
            disabled: true,
        },
        {
            label: "Export",
            key: nanoid(4),
            icon: <UploadOutlined />,
        },
        {
            label: "Import",
            key: nanoid(4),
            icon: <DownloadOutlined />,
        }
    ]

    const onCreateTable = () => {
        let key = nanoid(4);
        dispatch({type: "CONTENTS", payload: [...state.contents, {label: "Create Table",
                children: <CreateTable />,
                key: key}]})
        dispatch({type: "PANEL_ACTIVE", payload: key})
    }

    return (
        <Dropdown overlayStyle={{minWidth: 200}}  menu={{items: menuItems}}
                  trigger={["contextMenu"]}
                  onOpenChange={onClose}
                  open={open} placement="bottomLeft">
            <div style={{ position: "absolute", left: clientX, top: clientY, width: 0, height: 0 }} />
        </Dropdown>
    )
}
