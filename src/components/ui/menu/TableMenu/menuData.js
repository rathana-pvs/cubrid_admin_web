import {nanoid} from "nanoid";
import {ApiOutlined, DeleteOutlined, EditOutlined, MailOutlined, PlusOutlined} from "@ant-design/icons";

const server = [
    {
        label: "Disconnect Host",
        key: nanoid(4),
        icon: <ApiOutlined />,
    },
    {
        label: "Add Host",
        key: nanoid(4),
        icon: <PlusOutlined />,
    },
    {
        label: 'Edit Host',
        key: nanoid(4),
        icon: <EditOutlined />,

    },
    {
        label: 'Delete Host',
        key: nanoid(4),
        icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,

    },
]

const data = {server}
export const getMenuData = (type)=>{
    return data[type];
}