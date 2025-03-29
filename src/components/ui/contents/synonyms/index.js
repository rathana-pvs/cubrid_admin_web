import {Table} from "antd";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styles from "../Contents.module.css";
import {useAppContext} from "@/context/AppContext";
import axios from "axios";
import {getDatabaseLogin} from "@/utils/utils";


const columns = [
    { title: "Owner", dataIndex: "synonym_owner_name", key: "1"},
    { title: "Name", dataIndex: "synonym_name", key: "2" },
    { title: "Target Owner", dataIndex: "target_owner_name", ellipsis: true, key: "3"},
    { title: "Target Name", dataIndex: "target_name", ellipsis: true, key: "4" },
    { title: "Comment", dataIndex: "comment", ellipsis: true, key: "5" },
];


export default function () {
    const {state, dispatch} = useAppContext();
    const [listTables, setListTables] = useState([]);
    const [loading, setLoading] = useState(true);
    async function getSynonymsInfo() {
        const content = state.contents.find(res => res.key === state.panel_active)
        const server = state.servers.find(res => res.key === content.server_id)
        const database = state.databases.find(res => res.key === content.parentId);
        const database_login = getDatabaseLogin(server, database)
        const synonyms = await axios.post("/api/list-synonyms",{database_login})
            .then(res => res.data);
        setLoading(false);
        if (synonyms.success) {
            const tableData = synonyms.result.map(item => {
                item.key = nanoid(8)
                return item
            })
            setListTables(tableData);
        }
    }
    useEffect(() => {
        getSynonymsInfo()

    },[])

    return (
        <div className={styles.tables}>
            <div>
                <Table dataSource={listTables} columns={columns} pagination={false}
                       loading={loading}
                       bordered
                />
            </div>
        </div>
    )
}