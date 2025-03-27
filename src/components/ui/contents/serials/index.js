import {Table, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styles from "../Contents.module.css";
import {useAppContext} from "@/context/AppContext";
import axios from "axios";
import {getDatabaseLogin} from "@/utils/utils";


const columns = [
    { title: "Owner", dataIndex: "owner_name", key: "1"},
    { title: "Name", dataIndex: "name", key: "2" },
    { title: "Current Value", dataIndex: "current_val", key: "3"},
    { title: "Increment Value", dataIndex: "increment_val", key: "4"},
    { title: "Min Value", dataIndex: "min_val", key: "5" },
    { title: "Max Value", dataIndex: "max_val", key: "6"},
    { title: "Cache Number", dataIndex: "cached_num", key: "7" },
    { title: "Cycle", dataIndex: "cyclic", key: "8"}
];
export default function () {
    const {state, dispatch} = useAppContext();
    const [listTables, setListTables] = useState([]);
    async function getSerialsInfo() {
        const content = state.contents.find(res => res.key === state.panel_active)
        const server = state.servers.find(res => res.key === content.server_id)
        const database = state.databases.find(res => res.key === content.parentId);
        const serials = await axios.post("/api/list-serials",{database_login: getDatabaseLogin(server, database)})
            .then(res => res.data);
        if (serials.success) {
            const tableData = serials.result.map(item => {
                item.key = nanoid(8)
                return item
            })
            setListTables(tableData);
        }
    }
    useEffect(() => {
        getSerialsInfo()

    },[])

    return (
        <div className={styles.tables}>
            <div>
                <Table dataSource={listTables} columns={columns} pagination={false}
                       bordered
                />
            </div>
        </div>
    )
}