import React, {useEffect, useState} from "react";
import styles from "./header.module.css";
import {Header} from "antd/es/layout/layout";
import Button from '@/components/ui/button/Button'
import {Dropdown, Space} from "antd";
import {DownOutlined, UserDeleteOutlined} from "@ant-design/icons";
import {nanoid} from "nanoid";
import {useTranslations} from "next-intl";
import {formatMenuData, getAPIParam} from "@/utils/utils";
import useDispatch from "@/hooks/useDispatch";
import {useAppContext} from "@/context/AppContext";
import axios from "axios";
const  file = (node, dispatch)=>[
    {
        label: 'Add Host',
        onClick:()=>dispatch({type:"CONNECTION", payload:{type: "add", open:true}}),
    },
    {
        label: 'Change Host Info',
        disabled:node.type !== "server",
        onClick:()=>dispatch({type:"CONNECTION", payload:{type: "edit", open:true, server_id: node.server_id}}),
    },
    {
        label: 'Export Host Info',
    },
    {
        label: 'Disconnect Host Connection',
        disabled:node.type !== "server",
    },
    {
        label: 'Delete Host',
        disabled:node.type !== "server",
    },
    {
        label: 'Close Current & All Window',
    },
    {
        label: 'Import Workspace',
        disabled:true
    },
    {
        label: 'Change Workspace',
        disabled:true
    },
    {
        label: 'Basic Info',
        children: [
            {
                label: 'Basic Info',
                disabled:true
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
const tools = (state, dispatch)=> {
    const {selected_object} = state;
    const disabled = selected_object.type !== "server" || noselected_objectde.type !== "database";
    const disableDatabase = selected_object.type !== "database";
    return [
        {
            label: 'Stop Service',
            disabled
        },
        {
            label: 'Start Service',
            disabled
        },
        {
            label: (()=>{
                if (selected_object.type === "database") {
                    if (selected_object.status === "inactive")
                        return "Start Database";
                    else
                        return "Stop Database";
                }
                return "Start Database";
            })(),
            disabled: selected_object.type !== "database",
            onClick:async () => {
                const server = state.servers.find(res => res.server_id === selected_object.server_id);
                const response = await axios.post("/api/start-stop-db", {
                    ...getAPIParam(server),
                    database: selected_object.title,
                    type: selected_object.status === "inactive" ? "start": "stop",
                }).then(res => res.data)
                if(response.success){
                    const newDatabases = state.databases
                    newDatabases.forEach((item)=>{
                        if(item.title === selected_object.title){
                            item.status = "active"
                            item.icon = <i className={`fa-light fa-database success`}/>
                        }
                    })
                    dispatch({type: "SELECTED_OBJECT", payload: {}});
                    dispatch({type: "DATABASES", payload: [...state.databases, ...newDatabases]});
                }
            }

        },
        {
            label: 'Stop Brokers'
        },
        {
            label: 'Start Brokers'
        },
        {
            label: <span>Change Password Of <b>admin</b></span>
        },
        {
            label: 'Add CA users'
        },
        {
            label: 'Convert Broker log to SQL'
        },
        {
            label: 'Convert Output of broker_log_top to excel'
        },
        {
            label: 'Service Dashboard'
        },
    ]
}
const action = ()=> [
    {
        label: 'Show Host Dashboard',
    },
    {
        label: 'Server Version'
    },
    {
        label: 'Config Params',
        children: [
            {
                label: 'Attribute Config Parameter(DB)'
            },
            {
                label: 'Attribute Config Parameter(Broker)'
            }
        ]
    },

]
const help = ()=> [
    {
        label: 'Help'
    },
    {
        label: 'New Features'
    },
    {
        label: 'Report Bug'
    },
    {
        label: 'CUBRID Online Forum'
    },
    {
        label: 'CUBRID tools developments'
    },
    {
        label: 'Check for Updates'
    },
    {
        label: 'Server Version'
    },
    {
        label: 'About CUBRID Admin'
    },
]


export default function ({setLocale}) {
    const {state, dispatch} = useAppContext();
    const menus = [file, tools, action, help];
    const t = useTranslations()
    const [lang, setLang] = useState("en");
    const language = [
        {
            label: <b>EN</b>,
            key: nanoid(4),
            onClick: ()=>setLang("en"),
        },
        {
            label: <b>KR</b>,
            key: nanoid(4),
            onClick: ()=>setLang("kr"),
        }
    ]
    useEffect(() => {
        setLocale(lang)
    },[lang])
    return (
        <div className={styles.layout}>
            <div className={styles.layout__menu}>
                {[t("header.title.file"), t("header.title.tools"), t("header.title.action"), t("header.title.help")].map((item, index) => (
                    <Dropdown key={index} menu={{ items: menus[index](state, dispatch) }} trigger={['click']}>
                        <div className={styles.dropdown__menu} onClick={(e) => e.preventDefault()}>
                            {item}
                        </div>
                    </Dropdown>
                ))}
            </div>

            <div className={styles.layout__action}>
                <div className={styles.action__language}>
                    <Dropdown menu={{ items: language }} trigger={['click']}>
                        <div className={styles.dropdown__menu} onClick={(e) => e.preventDefault()}>
                            {lang.toUpperCase()}
                        </div>
                    </Dropdown>
                </div>
                <UserDeleteOutlined />
            </div>
        </div>
    )

}