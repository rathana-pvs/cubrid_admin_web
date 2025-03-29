import {Dropdown} from "antd";
import {
    ApiOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined, FileExcelOutlined, PicRightOutlined,
    PlusOutlined,
    UploadOutlined
} from "@ant-design/icons";
import {nanoid} from "nanoid";
import {useAppContext} from "@/context/AppContext";
import {setLocalStorage} from "@/utils/storage";

export default function({node, event, open, onClose}) {
    const {state, dispatch} = useAppContext();
    const {clientX, clientY} = event;
    const menuItems = [
        {
            label: "Create Java File",
            key: nanoid(4),
            icon: <PlusOutlined />,
        },
        {
            label: "Create PHP File",
            key: nanoid(4),
            icon: <PlusOutlined />,
        },
        {
            label: "Excel Export",
            key: nanoid(4),
            icon: <FileExcelOutlined />,
            disabled: true,
        },
        {
            label: "Export",
            key: nanoid(4),
            icon: <UploadOutlined />,
        },
        {
            label: "Import",
            key: nanoid(4),
            icon: <DownloadOutlined />,
        },
        {
            label: "Edit Table",
            key: nanoid(4),
            icon: <EditOutlined />,
        },
        {
            label: "Rename Table",
            key: nanoid(4),
            icon: <PicRightOutlined />,
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
