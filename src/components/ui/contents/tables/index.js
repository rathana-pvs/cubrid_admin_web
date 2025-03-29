import {Table, Tabs} from "antd";
import styles from '../Contents.module.css'
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {useAppContext} from "@/context/AppContext";
import axios from "axios";
import TableProperty from "@/components/ui/contents/tables/TableProperty";
import {getDatabaseLogin} from "@/utils/utils";


const columns = [
    { title: "Table", dataIndex: "class_name", key: "1" },
    { title: "Table Memo", dataIndex: "comment", key: "2" },
    { title: "Record", dataIndex: "record", key: "3" },
    { title: "Columns", dataIndex: "columns", key: "4" },
    { title: "PK", dataIndex: "pk", key: "5" },
    { title: "UK", dataIndex: "uk", key: "6" },
    { title: "FK", dataIndex: "fk", key: "7" },
    { title: "Index", dataIndex: "ind", key: "8" },
    { title: "Record Size", dataIndex: "size", key: "9" },
];
export default function () {
    const {state, dispatch} = useAppContext();
    const [listTables, setListTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [taps, setTaps] = useState([]);
    const [activeKey, setActiveKey] = useState("");
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
        const checkObject = taps.find(item => item.label === record.class_name) || false;
        if (checkObject) {
            setActiveKey(checkObject.key);
        }else{
            const newItem = {
                label: record.class_name,
                children: <TableProperty record={record}/>,
                key: nanoid(4),
            }
            setTaps([...taps, newItem]);
            setActiveKey(newItem.key)
        }

    }

    async function getTablesInfo() {
        const content = state.contents.find(res => res.key === state.panel_active)
        const server = state.servers.find(res => res.key === content.server_id)
        const database = state.databases.find(res => res.key === content.parentId);
        const tablesInfo = await axios.post("/api/tables-info",{database_login: getDatabaseLogin(server, database)})
            .then(res => res.data);
        setLoading(false);
        if (tablesInfo.success) {
            const tableData = tablesInfo.result.map((obj, index) => {
                obj["key"] = nanoid(8)
                if(obj["pk"]){
                    obj["pk"] = "YES"
                    obj["uk"] = obj["uk"] - 1
                    obj["ind"] = obj["ind"] - 1
                }else{
                    obj["pk"] = "NO"
                }
                obj["class_name"] = `${obj.owner_name}.${obj.class_name}`
                obj["record"] = tablesInfo.row[index]["row_count"]
                obj["server_id"] = server.id
                obj["database_id"] = database.id
                return obj
            })
            setListTables(tableData);
        }
    }
    useEffect(() => {
        getTablesInfo()

    },[])

    return (
        <div className={styles.tables}>
            <div>
                <Table dataSource={listTables} columns={columns} pagination={false}
                       loading={loading}
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