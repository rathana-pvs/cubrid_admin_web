import {Table} from "antd";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styles from "../Contents.module.css";
import {useAppContext} from "@/context/AppContext";
import axios from "axios";
import {getDatabaseLogin} from "@/utils/utils";


const columns = [
    { title: "Owner", dataIndex: "owner_name", key: "1"},
    { title: "Name", dataIndex: "name", key: "2" },
    { title: "Target Table", dataIndex: "target_class_name", ellipsis: true, key: "3"},
    { title: "Event Type", dataIndex: "event_type", ellipsis: true, key: "4" },
    { title: "Trigger Status", dataIndex: "trigger_status", ellipsis: true, key: "5" },
    { title: "Trigger Priority", dataIndex: "priority", ellipsis: true, key: "6" },
    { title: "Execution Time", dataIndex: "execution_time", ellipsis: true, key: "7" },
    { title: "Action Type", dataIndex: "action", ellipsis: true, key: "8" },
];
const EVENTS = ["UPDATE", "UPDATE STATEMENT", "DELETE",
    "DELETE STATEMENT", "INSERT", "INSERT STATEMENT", "COMMIT", "ROLLBACK"
]
const ACTIONS_TIME = ["", "BEFORE", "AFTER", "DEFERRED"]

const ACTION_TYPE = ["", "INSERT | UPDATE | DELETE | CALL", "REJECT", "INVALIDATE_TRANSACTION", "PRINT"]

export default function () {
    const {state, dispatch} = useAppContext();
    const [listTables, setListTables] = useState([]);
    const [loading, setLoading] = useState(true);
    async function getTriggersInfo() {
        const content = state.contents.find(res => res.key === state.panel_active)
        const server = state.servers.find(res => res.key === content.server_id)
        const database = state.databases.find(res => res.key === content.parentId);
        const database_login = getDatabaseLogin(server, database)
        const triggers = await axios.post("/api/list-triggers",{database_login})
            .then(res => res.data);
        setLoading(false);
        if (triggers.success) {
            const tableData = triggers.result.map(item => {
                item.key = nanoid(8)
                item.event_type = EVENTS[item.event];
                item.trigger_status = item.status === 1? "INACTIVE" : "ACTIVE";
                item.execution_time = ACTIONS_TIME[item.action_time];
                item.action = ACTION_TYPE[item.action_type];
                return item
            })
            setListTables(tableData);
        }
    }
    useEffect(() => {
        getTriggersInfo()

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