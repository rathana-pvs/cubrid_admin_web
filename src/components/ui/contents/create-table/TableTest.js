import React, { useState, useContext, useEffect, useRef } from "react";
import { Table, Input, Form, Typography } from "antd";
import styles from "./CreateTable.module.css";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                name={dataIndex}
                // rules={[{ required: true, message: `${title} is required.` }]}
            >
                <Input ref={inputRef} rootClassName={styles.table__input} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const EditableTable = () => {
    const [dataSource, setDataSource] = useState([
        { key: "0", name: "John", age: "32", address: "New York" },
        { key: "1", name: "Jane", age: "28", address: "London" },
    ]);

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        newData[index] = { ...newData[index], ...row };
        setDataSource(newData);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            editable: true,
            onCell: () => ({
                className: styles.table__td
            }),
        },
        {
            title: "Age",
            dataIndex: "age",
            editable: true,
        },
        {
            title: "Address",
            dataIndex: "address",
            editable: true,
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
                className: styles.table__td
            }),
        };
    });

    return (
        <Table
            components={{
                body: {
                    row: EditableRow,
                    cell: EditableCell,
                },
            }}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
        />
    );
};

export default EditableTable;
