import {Dropdown} from "antd";
import {ApiOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {nanoid} from "nanoid";

import {setLocalStorage} from "@/utils/storage";
import {useDispatch, useSelector} from "react-redux";
import {serverDisconnect} from "@/state/sharedAction";
import {setConnection} from "@/state/dialogSlice";
import {deleteServer} from "@/state/serverSlice";

export default function({node, event, open, onClose}) {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const {clientX, clientY} = event;
    const menuItems = [
        {
            label: "Disconnect Host",
            key: nanoid(4),
            icon: <ApiOutlined />,
            onClick: () => {dispatch(serverDisconnect())}
        },
        {
            label: "Add Host",
            key: nanoid(4),
            icon: <PlusOutlined />,
            onClick:()=>dispatch(setConnection({open: true, type: "add"}))
        },
        {
            label: 'Edit Host',
            key: nanoid(4),
            icon: <EditOutlined />,
            onClick:()=>dispatch(setConnection({open: true, type: "edit", serverId: node.serverId}))

        },
        {
            label: 'Delete Host',
            key: nanoid(4),
            icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,
            onClick: ()=> dispatch(deleteServer(node))

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
            onClick: ()=> {

            }

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
