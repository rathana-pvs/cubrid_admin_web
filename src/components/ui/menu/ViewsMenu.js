import {Dropdown} from "antd";
import {
    ApiOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined, FileExcelOutlined, PicRightOutlined,
    PlusOutlined, ReloadOutlined,
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
            label: "Create View",
            key: nanoid(4),
            icon: <PlusOutlined />,
        },
        {
            label: "Refresh",
            key: nanoid(4),
            icon: <ReloadOutlined />,

        }
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
