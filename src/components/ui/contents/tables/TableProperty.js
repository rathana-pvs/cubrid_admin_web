import {Table} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAppContext} from "@/context/AppContext";
import {getDatabaseLogin} from "@/utils/utils";

const columns = [
    { title: "Column Name", dataIndex: "attr_name", key: "1" },
    { title: "Column Memo", dataIndex: "comment", key: "2" },
    { title: "Data Type", dataIndex: "data_type", key: "3" },
    { title: "Default", dataIndex: "default_value", key: "4" },
    { title: "Auto Increment", dataIndex: "auto_increment", key: "5" },
    { title: "Not Null", dataIndex: "not_null", key: "6" },
    { title: "Unique", dataIndex: "unique", key: "7" }
];
export default function ({record}) {
    const {state, dispatch} = useAppContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getColumns() {
        const server = state.servers.find(item => item.id === record.server_id)
        const database = state.databases.find(item => item.id === record.database_id)
        const table = record.class_name.split(".")
        const database_login = getDatabaseLogin(server, database)
        const columns = await axios.post("/api/column-info",
            {database_login, owner: table[0], table:table[1]})
            .then(res => res.data)
        const indexes = await axios.post("/api/index-info",
            {database_login, owner: table[0], table:table[1]})
            .then(res => res.data)
        const serial = await axios.post("/api/serial-info",
            {database_login, owner: table[0], table: table[1]})
            .then(res => res.data)
        setLoading(false);
        const columnData = columns.result.map(item => {
            const auto_increment = serial.result.find(res => res.att_name === item.attr_name) || false
            const unique = indexes.result.find(res=>res)
            return {
                server: record.server_id,
                ...item,
                not_null: item.is_nullable === "YES"?"NO": "YES",
                auto_increment: auto_increment? `${auto_increment.min_val}, ${auto_increment.increment_val}` : "",

            }
        })
         setData(columnData);
    }
    useEffect(() => {
        getColumns()
    },[])
    return <Table dataSource={data} columns={columns} pagination={false}
                  loading={loading}
                  bordered
    />
}