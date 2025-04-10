import {AutoComplete, Button, Checkbox, Dropdown, Input, Select, Table} from "antd";
import React, {useEffect, useRef, useState} from "react";
import styles from "./CreateTable.module.css";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {nanoid} from "nanoid";

const dataType = [
    { value: `VARCHAR` },
    { value: `INTEGER` },
    { value: `BIGINT` },
    { value: `NCHAR VARYING` }
]
let tempData = []
export default function (){
    const [data, setData] = useState([
        {key: nanoid(8)}

    ]);


    useEffect(() => {
        tempData = data
    },[data])

    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleRightClick = (event, record) => {
        event.preventDefault(); // Prevent the default right-click menu
        setSelectedRow(record);
        setMenuPosition({ x: event.clientX, y: event.clientY });
        setMenuVisible(true);
    };
    const menuItems = [
        {
            label: 'Delete Column',
            key: nanoid(4),
            icon: <DeleteOutlined style={{color: 'var(--danger-color)'}} />,
            onClick: () => removeRow()
        }
    ]

    const handleChange = (e, key, field) => {
        tempData = tempData.map((item) =>
            item.key === key ? {...item, [field]: e.target.value} : item
        );

    };
    const addRow = () => {
        const newData = [...tempData, { key: nanoid(8) }];
        setData(newData);
        tempData = newData;
    }

    const removeRow = () => {
        const newData = tempData.filter(item => item.key !== selectedRow.key);
        setData(newData);
        tempData = newData;
    }
    const columns = [
        {
            title: "FK Name",
            dataIndex: "fk",
            width: 140,
            onCell: () => ({
                className: styles.table__td,
            }),
            render: (text, record) => (

                <Input defaultValue={text}
                    // ref={inputRef}
                       rootClassName={styles.table__input}
                       onChange={(e) => handleChange(e, record.key, "name")}
                    // onChange={(value) => handleChange(record.key, "name", value)}

                />


            ),
        },
        {
            title: "Column Name",
            dataIndex: "col_name",
            onCell: () => ({
                className: styles.table__td,
            }),
            render: (text, record) => (
                <AutoComplete
                    options={dataType}
                    popupClassName={"content__column"}
                >
                    <Input className={styles.table__input} onChange={(e) => handleChange(e, record.key, "type")} />
                </AutoComplete>
            ),
        },
        {
            title: "Foreign Table",
            dataIndex: "fk_table",
            onCell: () => ({
                className: styles.table__td,
            }),
            render: (text, record) => (
                <Input value={text} rootClassName={styles.table__input} onChange={(e) => handleChange(e, record.key, "age")} />
            ),
        },
        {
            title: "Foreign Column Name",
            width: "180px",
            dataIndex: "f_col_name",
            onCell: () => ({
                className: styles.table__td,
            }),
            render: (text, record) => (
                <Input value={text} rootClassName={styles.table__input} onChange={(e) => handleChange(e, record.key, "age")} />
            ),
        },
        {
            title: "Update",
            dataIndex: "update",
            onCell: () => ({
                className: styles.table__td,
            }),
            render: (text, record) => (
                <Input value={text} rootClassName={styles.table__input} onChange={(e) => handleChange(e, record.key, "age")} />
            ),
        },
        {
            title: "Delete",
            dataIndex: "delete",
            onCell: () => ({
                className: styles.table__checkbox,
            }),
            render: (text, record) => (
                <Input value={text} rootClassName={styles.table__input} onChange={(e) => handleChange(e, record.key, "age")} />
            ),
        },
        {
            title: "Cache",
            dataIndex: "cache",
            onCell: () => ({
                className: styles.table__checkbox,
            }),
            render: (text, record) => (
                <Input value={text} rootClassName={styles.table__input} onChange={(e) => handleChange(e, record.key, "age")} />
            ),
        },

    ];
    return(
        <div style={{ overflowX: "auto"}}>
            <Table  bordered columns={columns} dataSource={tempData} pagination={false}
                    components={{
                        body: {
                            wrapper: ({ children, ...props }) => {

                                return <tbody {...props}>
                                {children}
                                <tr className="custom-footer-row">
                                    <td colSpan={columns.length} style={{textAlign: "center", padding: "12px"}}>
                                        <Button shape={"circle"} icon={<PlusOutlined />}
                                                onClick={()=>addRow()}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            },
                        },
                    }}
                    onRow={(record) => ({
                        onContextMenu: (event) => handleRightClick(event, record),
                    })}

            >
            </Table>
            <Dropdown menu={{items:menuItems}}
                      trigger={["contextMenu"]}
                      onOpenChange={()=>setMenuVisible(false)}
                      open={menuVisible} placement="bottomLeft">

                <div
                    style={{
                        position: "absolute",
                        right: menuPosition.x,
                        bottom: menuPosition.y,
                        zIndex: 1000,
                    }}
                    onClick={() => setMenuVisible(false)}
                />
            </Dropdown>


        </div>
    )

}