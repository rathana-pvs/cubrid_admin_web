import {Table, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styles from "../Contents.module.css";
import {useAppContext} from "@/context/AppContext";
import axios from "axios";
import TableProperty from "@/components/ui/contents/tables/TableProperty";
import {getDatabaseLogin} from "@/utils/utils";


const columns = [
    { title: "Owner", dataIndex: "owner_name", key: "1"},
    { title: "View", dataIndex: "class_name", key: "2" },
    { title: "Query Specific", dataIndex: "query", ellipsis: true, key: "3", colSpan: 3,
        render: (text, record) => ({
            children: text,
            props: { colSpan: 3 }, // Merge with next column
        }),
    }
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
        const checkObject = taps.find(item => item.label === record.class_name) || false;
        if (checkObject) {
            setActiveKey(checkObject.key);
        }else{
            // const newItem = {
            //     label: record.class_name,
            //     children: <TableProperty record={record}/>,
            //     key: nanoid(4),
            // }
            // setTaps([...taps, newItem]);
            // setActiveKey(newItem.key)
        }

    }

    async function getViewsInfo() {
        const content = state.contents.find(res => res.key === state.panel_active)
        const server = state.servers.find(res => res.key === content.server_id)
        const database = state.databases.find(res => res.key === content.parentId);
        const views = await axios.post("/api/list-views",{database_login: getDatabaseLogin(server, database)})
            .then(res => res.data);
        if (views.success) {
            const tableData = views.result.filter(res=>res.is_system_class === "NO").map(item => {
                item.query = item.vclass_def
                item.key = nanoid(8)
                return item
            })
            setListTables(tableData);
        }
    }
    useEffect(() => {
        getViewsInfo()

    },[])

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
                    style={{ whiteSpace: "nowrap" }}
                />
            </div>
        </div>
    )
}