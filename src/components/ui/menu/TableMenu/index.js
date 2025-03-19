import {Dropdown, Menu} from "antd";

const items = [
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item（disabled）',
        key: '3',
        disabled: true,
    },
];
const TableMenu = ({open, x, y})=> {
    console.log(open, x, y)


    return (
        <Dropdown menu={{items}} trigger={["contextMenu"]} open={open} placement="bottomLeft">
            <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0 }} />
        </Dropdown>
    )
}

export default TableMenu;