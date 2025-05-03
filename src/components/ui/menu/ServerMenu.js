import {Dropdown} from "antd";
import {ApiOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {nanoid} from "nanoid";
import {useAppContext} from "@/context/AppContext";
import {setLocalStorage} from "@/utils/storage";

export default function({node, event, open, onClose}) {
    const {state, dispatch} = useAppContext();
    const {clientX, clientY} = event;
    const menuItems = [
        {
            label: "Disconnect Host",
            key: nanoid(4),
            icon: <ApiOutlined />,
            onClick: () => {dispatch({type: "RESET_SERVER", payload: node.server_id});}
        },
        {
            label: "Add Host",
            key: nanoid(4),
            icon: <PlusOutlined />,
            onClick:()=>dispatch({type:"CONNECTION", payload:{type: "add", open:true}})
        },
        {
            label: 'Edit Host',
            key: nanoid(4),
            icon: <EditOutlined />,
            onClick:()=>dispatch({type:"CONNECTION", payload:{server_id: node.server_id, type: "edit", open:true}})

        },
        {
            label: 'Delete Host',
            key: nanoid(4),
            icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,
            onClick: ()=> onDelete()

        },
        {
            label: 'Export Connections to JDBC/CCI URL',
            key: nanoid(4),
            icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,
            onClick: ()=> onDelete()

        },
        {
            label: 'Change Manager\'s Password',
            key: nanoid(4),
            icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,
            onClick: ()=> onDelete()

        },
        {
            label: 'Show Host Dashboard',
            key: nanoid(4),
            icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,
            onClick: ()=> onDelete()

        },
        {
            label: 'Server Version',
            key: nanoid(4),
            icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,
            onClick: ()=> onDelete()

        },
        {
            label: 'Properties',
            key: nanoid(4),
            icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,
            onClick: ()=> onDelete()

        },
        {
            label: 'Unify settings editor',
            key: nanoid(4),
            icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,
            onClick: ()=> onDelete()

        },
    ]

    const onDelete = ()=>{
        const connections = state.servers.filter(item => item.server_id !== node.server_id);
        setLocalStorage("connections", connections);
        dispatch({type: "SERVERS", payload: connections});
    }
    return (
        <Dropdown overlayStyle={{minWidth: 200}}  menu={{items: menuItems}}
                  trigger={["contextMenu"]}
                  onOpenChange={onClose}
                  open={open} placement="bottomLeft">
            <div style={{ position: "absolute", left: clientX, top: clientY, width: 0, height: 0 }} />
        </Dropdown>
    )
}
