import {Dropdown, List, Menu, Skeleton, Table, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styles from "./Users.module.css";
import {useAppContext} from "@/context/AppContext";
import axios from "axios";
import TableProperty from "@/components/ui/contents/tables/TableProperty";
import {getDatabaseLogin} from "@/utils/utils";
import {
    AppstoreOutlined,
    EditOutlined,
    HomeOutlined,
    MailOutlined,
    SettingOutlined,
    UserOutlined
} from "@ant-design/icons";


const columns = [
    { title: "Table", dataIndex: "class_name", key: "1", width: 100 },
    { title: "Owner", dataIndex: "owner_name", key: "2", width: 100 },
    { title: "Select", dataIndex: "select", key: "3" },
    { title: "Insert", dataIndex: "class_name", key: "1"},
    { title: "Update", dataIndex: "owner_name", key: "2" },
    { title: "Delete", dataIndex: "select", key: "3" },
    { title: "Alter", dataIndex: "class_name", key: "1"},
    { title: "Index", dataIndex: "owner_name", key: "2" },
    { title: "Execute", dataIndex: "select", key: "3" },
    { title: "Grant Select", dataIndex: "select", key: "3" },
    { title: "Grant Insert", dataIndex: "class_name", key: "1"},
    { title: "Grant Update", dataIndex: "owner_name", key: "2" },
    { title: "Grant Delete", dataIndex: "select", key: "3" },
    { title: "Grant Alter", dataIndex: "class_name", key: "1"},
    { title: "Grant Index", dataIndex: "owner_name", key: "2" },
    { title: "Grant Execute", dataIndex: "select", key: "3" },
];
export default function () {
    const {state, dispatch} = useAppContext();
    const [users, setUsers] = useState([]);
    const [listTables, setListTables] = useState([]);
    const [taps, setTaps] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingPermission, setLoadingPermission] = useState(false);
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

    function getTableInfo(user) {

    }
    async function getUsersInfo() {
        const content = state.contents.find(res => res.key === state.panel_active)
        const server = state.servers.find(res => res.key === content.server_id)
        const database = state.databases.find(res => res.key === content.parentId);
        const database_login = getDatabaseLogin(server, database)
        const users = await axios.post("/api/list-users",{database_login})
            .then(res => res.data);
        setLoadingUser(false);
        if(users.success) {
            const userData = users.result.map((res, index) => {
                if(index === 0) {
                    getTableInfo(res);
                }
                return {
                    key: nanoid(8),
                    icon: <UserOutlined />,
                    text: res.name,
                }
            })
            setUsers(userData);
        }


    }
    useEffect(() => {
        getUsersInfo()

    },[])


    return (
        <div className={styles.user__layout}>

                {loadingUser?
                    <div style={{ width: 200 }}>
                        <Skeleton active />
                    </div>
                    :
                    <div className={styles.user__list}>
                        <List
                            dataSource={users}
                            renderItem={(item) => (
                                <List.Item className={`${styles.user__list__item} ${selectedUser.key === item.key? styles.item__selected: ""}`}
                                           onClick={()=>setSelectedUser(item)}>
                                    {item.icon} <span style={{ marginLeft: 8, fontWeight: 500 }}>{item.text}</span>
                                </List.Item>
                            )}
                        />
                    </div>
                }
            {loadingUser?
                <Skeleton active />:
                <div style={{ overflowX: "auto"}}>
                    <Table dataSource={listTables} columns={columns} pagination={false}
                           bordered
                           loading={loadingPermission}
                           style={{ height: "100%", width: "100%" }}
                           onRow={(record) => ({
                               onDoubleClick: ()=>onAdd(record),
                           })}
                           scroll={{ x: "max-content" }}
                    />
                </div>

            }


        </div>
    )
}