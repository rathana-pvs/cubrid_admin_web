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
import {useDispatch, useSelector} from "react-redux";
import {onStartBrokers, onStopBrokers} from "@/utils/utils";

export default function({node, event, open, onClose}) {
    const state = useSelector(state => state);
    const {subServers} = state;
    const dispatch = useDispatch();
    const {clientX, clientY} = event;
    const started = node.status === "ON";
    const menuItems = [
        {
            label: started ? "Stop Broker": "Start Broker",
            key: nanoid(4),
            icon: <PlusOutlined />,
            onClick: () => {
                if(started) {
                    onStopBrokers(node, state, dispatch);
                }else {
                    onStartBrokers(node, state, dispatch);
                }
            }
        },
        {
            label: "Show Status",
            key: nanoid(4),
            icon: <ReloadOutlined />,

        },
        {
            label: "Edit Broker",
            key: nanoid(4),
            icon: <ReloadOutlined />,

        },
        {
            label: "Properties",
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
