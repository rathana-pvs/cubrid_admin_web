import {Dropdown} from "antd";
import {
    PlusOutlined, ReloadOutlined,
} from "@ant-design/icons";
import {nanoid} from "nanoid";
import {useAppContext} from "@/context/AppContext";
import {onStartStopDatabase} from "@/utils/utils";

export default function({node, event, open, onClose}) {
    const {state, dispatch} = useAppContext();
    const {clientX, clientY} = event;
    const menuItems = [
        {
            label: "Login",
            key: nanoid(4),
            icon: <PlusOutlined />,
        },
        {
            label: "Edit Database Login",
            key: nanoid(4),
            icon: <ReloadOutlined />,
            children: [
                {
                    label: "DB name alias",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,

                }
            ]

        },
        {
            label: "Open Database Dashboard",
            key: nanoid(4),
            icon: <PlusOutlined />,
        },
        {
            label: "Exports",
            key: nanoid(4),
            icon: <PlusOutlined />,
            children: [
                {
                    label: "Exports (loadDB)",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,

                },
                {
                    label: "Exports Index Only(loadDB)",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,

                },
                {
                    label: "Exports Index Only(sql,csv,xls,txt,obs)",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,

                },
                {
                    label: "Export DB with Comments (sql,csv,xls,txt,obs)",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,

                },
                {
                    label: "Export DB with Comments (loadDB)",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,

                },
                {
                    label: "Exports using Separator Option (txt file)",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,

                }
            ]
        },
        {
            label: "Imports",
            key: nanoid(4),
            icon: <ReloadOutlined />,
            children: [
                {
                    label: "Exports using Separator Option (txt file)",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,

                }
            ]

        },
        {
            label: "Schema Compare Wizard",
            key: nanoid(4),
            icon: <ReloadOutlined />,
            children: [
                {
                    label: "Function Index Copy",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,

                }
            ]

        },
        {
            label: "DB Data Compare Wizard",
            key: nanoid(4),
            icon: <ReloadOutlined />,
        },
        {
            label: "Exports Schemas to ERwin XML",
            key: nanoid(4),
            icon: <ReloadOutlined />,
            children: [
                {
                    label: "Run with ON DELETE SET NULL Option For Foreign Keys",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Run with ON DELETE CASCADE Option for Foreign Keys",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Run with ON DELETE RESTRICT Option For Foreign Keys",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Run with ON UPDATE NO ACTION Option for Foreign Keys",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Run with ON UPDATE RESTRICT Option For Foreign Keys",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },

            ]
        },
        {
            label: "Imports Schema from ERwin XML",
            key: nanoid(4),
            icon: <ReloadOutlined />,
        },
        {
            label: "Table description excel exports",
            key: nanoid(4),
            icon: <ReloadOutlined />,
        },
        {
            label: node.status === "inactive" ? "Start Database" : "Stop Database",
            key: nanoid(4),
            icon: <ReloadOutlined />,
            onClick: () => onStartStopDatabase(node, state, dispatch)
        },
        {
            label: "Manage Database",
            key: nanoid(4),
            icon: <ReloadOutlined />,
            children: [
                {
                    label: "Database Unload",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Database Load",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Database Optimize",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Compact Database",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Check Database",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Create Database",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Rename Database",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Backup Database",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Restore Unload",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Delete Database",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
            ]
        },
        {
            label: "Database Info",
            key: nanoid(4),
            icon: <ReloadOutlined />,
            children: [
                {
                    label: "Lock Information",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Transaction Info",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Plan Dump",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "Param Dump",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
                {
                    label: "OID Navigator",
                    key: nanoid(4),
                    icon: <ReloadOutlined />,
                },
            ]
        },
        {
            label: "Properties",
            key: nanoid(4),
            icon: <ReloadOutlined />,
        },

    ]

    return (
        <Dropdown overlayStyle={{minWidth: 200}}  menu={{items: menuItems}}
                  trigger={["contextMenu"]}
                  onOpenChange={onClose}
                  open={open} placement="bottomLeft">
            <div style={{ position: "absolute", left: clientX, top: clientY, width: 0, height: 0 }} />
        </Dropdown>
    )
}
