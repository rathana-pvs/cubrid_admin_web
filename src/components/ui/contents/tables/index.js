import {Divider, Table, Tabs} from "antd";
import styles from './Tables.module.css'
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {useAppContext} from "@/context/AppContext";
import {findServer, generalAPI, getAPIData, getServerData, getSharedData} from "@/utils/utils";
import axios from "axios";
const dataSource = [
    { key: "1", table: "code", memo: "", record: "25", columns: "3", pk:"1", uk: "0", fk: "0", index: "1", size: "30B"},
    { key: "1", table: "game", memo: "", record: "25", columns: "3", pk:"1", uk: "0", fk: "0", index: "1", size: "30B"},

];

const columns = [
    { title: "Table", dataIndex: "table", key: "1" },
    { title: "Table Memo", dataIndex: "memo", key: "2" },
    { title: "Record", dataIndex: "record", key: "3" },
    { title: "Columns", dataIndex: "column", key: "4" },
    { title: "PK", dataIndex: "pk", key: "5" },
    { title: "UK", dataIndex: "uk", key: "6" },
    { title: "FK", dataIndex: "fk", key: "7" },
    { title: "Index", dataIndex: "index", key: "7" },
    { title: "Record Size", dataIndex: "size", key: "8" },
];
export default function () {
    const {state, dispatch} = useAppContext();
    const [listTables, setListTables] = useState([]);
    const [taps, setTaps] = useState([]);
    const [activeKey, setActiveKey] = useState("table1");
    const onChange = (key) => {
        setActiveKey(key)
    };
    const remove = (targetKey) => {

        const remainObject = taps.filter(pane => pane.key !== targetKey);
        if(remainObject.length && (targetKey === activeKey)) {
            const key = remainObject[remainObject.length - 1].key;
            setActiveKey(key);
        }
        setTaps(remainObject);

    };
    const onEdit = (targetKey, action) => {
        if (action !== 'add') {
            remove(targetKey);
        }
    };

    const onAdd = (record) => {
        const checkObject = taps.find(item => item.label === record.table) || false;
        if (checkObject) {
            setActiveKey(checkObject.key);
        }else{
            const newItem = {
                label: record.table,
                children: `Content of ${record.table}`,
                key: nanoid(4),
            }
            setTaps([...taps, newItem]);
            setActiveKey(newItem.key)
        }

    }

    useEffect(() => {

        if (Object.keys(state.tables).length > 0) {
            const tableData = []
            for (const [key, value] of Object.entries(state.tables)) {

                if ((value.virtual === "normal") && (value.type === "user")) {
                    value["table"] = value["classname"];
                    tableData.push(value)

                    const uui = findServer(value.database_id, state, "table")
                    const api = getAPIData(uui);
                    const dbname = state.databases[value.database_id].dbname;
                    // const columns_info = await generalAPI({...api ,task: "class", dbname, classname: value.classname})
                }
            }
            setListTables(tableData);
        }

    },{...state.tables});



    return (
        <div className={styles.tables}>
            <div>
                <Table dataSource={listTables} columns={columns} pagination={false}
                       bordered
                       onRow={(record) => ({
                           onDoubleClick: ()=>onAdd(record),
                       })}
                />
            </div>
            <div>
                <Tabs
                    hideAdd
                    onChange={onChange}
                    activeKey={activeKey}
                    type="editable-card"
                    onEdit={onEdit}
                    items={taps}
                />
            </div>
        </div>
    )
}