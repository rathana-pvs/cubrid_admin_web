"use client";
import React, {memo, useEffect, useRef, useState} from 'react';
import {AutoComplete, Button, Checkbox, Col, Form, Input, message, Modal, Row, Select, Space, Table} from "antd";
import {useAppContext} from "@/context/AppContext";
import styles from "./db-login.module.css";
import {appendToLocalStorage, getLocalStorage} from "@/utils/storage";
import { v4 as uuid } from 'uuid';
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {getSharedData} from "@/utils/utils";




// Custom row component to avoid re-rendering the entire table
const EditableTableRow = memo(({ record, onInputChange, onDelete }) => {
    console.log(record);
    return (
        <tr>
            <td>
                <Input
                    value={record?.name}
                    onChange={(e) => onInputChange(record.key, "name", e.target.value)}
                    bordered={false}
                />
            </td>
            <td>
                <Input
                    type="number"
                    value={record?.value}
                    onChange={(e) => onInputChange(record.key, "value", e.target.value)}
                    bordered={false}
                />
            </td>
            <td>
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(record.key)}
                />
            </td>
        </tr>
    );
});

const DynamicTable = () => {
    const [data, setData] = useState([
        { key: "1", name: "John Doe", value: 30 },
        { key: "2", name: "Jane Smith", value: 25 },
    ]);

    // Add new row
    const addRow = () => {
        const newRow = {
            key: String(data.length + 1),
            name: "",
            value: "",
        };
        setData([...data, newRow]);
    };

    // Delete row
    const deleteRow = (key) => {
        setData(data.filter((item) => item.key !== key));
    };

    // Handle input changes
    const handleInputChange = (key, field, value) => {
        const newData = data.map((item) =>
            item.key === key ? { ...item, [field]: value } : item
        );
        setData(newData);
    };

    // Define table columns
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => text,
        },
        {
            title: "Value",
            dataIndex: "value",
            render: (text, record) => text,
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => <></>, // This is now handled in the custom row
        },
    ];

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={addRow} style={{ marginBottom: 16 }}>
                Add Row
            </Button>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
                components={{
                    body: {
                        row: ({ children, ...restProps }) => {
                            console.log(children[0].props.record);
                            return (
                            <EditableTableRow
                                {...restProps} // Spread props to get 'record' and other props
                                record={children[0].props.record} // Pass record as a prop to the row component
                                onInputChange={handleInputChange} // Pass the input change handler
                                onDelete={deleteRow} // Pass delete handler
                            />
                        )},
                    },
                }}
            />
        </div>
    );
};



export default function () {
    const {state, dispatch} = useAppContext();
    const [form] = Form.useForm();
    const [action, setAction] = useState("")
    const [selectedData, setSelectedData] = useState({});
    const [checkBoxFields, setCheckBoxFields ] = useState({
        autoCommit: false,
        savePassword: false,
        setTimeout: false,
    }); // Default auto-commit value


    const handleSubmit = (values) => {
        // Simulate connection logic
        const connectionDetails = {
            name:values.name,
            host: values.host,
            port: values.port,
            password: values.password,
            charset: values.charset,
            uuid: uuid(),
            ...checkBoxFields
            // autoCommit: autoCommit,
        };

        if(action === "save"){
            appendToLocalStorage("connections", connectionDetails);
            const connections = [...state.connection_data,connectionDetails]
            dispatch({type: "CONNECTION_DATA", payload: connections});
            handleClose(true)
        }

    };

    const onAction = (name) => {
        setAction(name);
    }

    const handleCheckBox = (e)=>{
        const {name, checked} = e.target;
        setCheckBoxFields(prevState => ({...prevState, [name]: checked}));
    }

    function handleClose(status) {
        dispatch({type: "LOGIN_DB_STATE", payload: false})
        if(status){
            form.resetFields();
        }

    }
    useEffect(() => {
        if(state.isOpenDBLogin){
            const id = getLocalStorage("selectedDatabase");

            const shareData = getSharedData(id);
            setSelectedData(shareData);
        }
    },[state.isOpenDBLogin])
    function getHost() {
        const id = getLocalStorage("selectedDatabase");

        const shareData = getSharedData(id);
        return shareData.host;
    }
    return (
        <>
            <Modal className={styles.modal} closeIcon={null} title="Database Login" maskClosable={false} open={state.isOpenDBLogin} onOk={() => handleClose(true)}
                   onCancel={() => handleClose(false)} footer={null} centered={true}>

                <Form form={form} onFinish={handleSubmit} autoComplete="off" layout="horizontal">
                    <Row gutter={[12, 6]}>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{span: 5}}
                                label="DB Username"
                                name="name"
                                rules={[{required: true, message: "Please enter the name"}]}
                            >
                                <Input defaultValue={"dba"} placeholder="Enter DB Username"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{span: 5}}
                                label="Password"
                                name="password"
                                rules={[{message: "Please enter the password"}]}
                            >
                                <Input.Password placeholder="Enter password" autoComplete="new-password"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item labelCol={{span: 5}} label={"Optional: "}>
                                <Row style={{ justifyContent: "space-between" }}>
                                    <Col style={{display:"flex", alignItems: "center"}}>
                                        <Checkbox name="savePassword" onChange={handleCheckBox}>Save Password</Checkbox>
                                    </Col>
                                    <Col className={styles.purpose__container}>
                                        <div className={styles.custom__label}>Purpose: </div>
                                        <Select defaultValue={"generic"} className={styles.purpose__select}>
                                            <Select.Option value={"generic"}>Generic</Select.Option>
                                            <Select.Option value={"dev"}>Dev</Select.Option>
                                            <Select.Option value={"live"}>Live</Select.Option>
                                            <Select.Option value={"test"}>Test</Select.Option>
                                            <Select.Option value={"temp"}>Temp</Select.Option>
                                            <Select.Option value={"other"}>Other</Select.Option>

                                        </Select>
                                    </Col>
                                </Row>

                            </Form.Item>

                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{span: 5}}
                                label="DB Alias"
                                name="alias"
                            >
                                <Input placeholder="You can give a seperate name for each database"/>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                labelCol={{span: 5}}
                                label="Brokers IP"
                                name="broker_ip"
                            >
                                <Input defaultValue={"localhost"}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{span: 5}}
                                label="Brokers Port"
                                name="broker_port"
                            >
                                <AutoComplete
                                    options={[
                                        { value: "query_editor[30000/OFF]" },
                                        { value: "broker1[33000/OFF]" },
                                    ]}
                                    defaultValue={"query_editor[30000/OFF]"}
                                >
                                    <Input />
                                </AutoComplete>

                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                labelCol={{span: 5}}
                                label="Charset"
                                name="charset"
                            >
                                <AutoComplete
                                    options={[
                                        { value: "UTF-8" },
                                        { value: "Cp1252" },
                                        { value: "ISO-8859-1" },
                                        { value: "EUC-KR" },
                                        { value: "EUC-JP" },
                                        { value: "GB2312" },
                                        { value: "GBK" }
                                    ]}
                                    defaultValue={"UTF-8"}>
                                    <Input/>
                                </AutoComplete>
                            </Form.Item>
                        </Col>

                        {/* Database Input */}

                        <Col span={20}>
                            <Form.Item
                                labelCol={{span: 6}}
                                label="JDBC Options: "
                                name="option"
                            >
                                <Input readOnly={true}/>
                            </Form.Item>

                        </Col>
                        <Col span={4}>
                            <Button type={"primary"} className={"button__small"} onClick={()=>handleClose()}>
                                Manage
                            </Button>
                        </Col>

                        {/* Submit Button */}
                        <Col span={24} style={{marginTop:24}}>
                            <Form.Item>
                                <Row align="middle" className={styles.action} gutter={[16, 0]} style={{ width: "100%" }}>

                                    <Col>
                                        <Button className={"button button__primary button__small"}
                                                htmlType="submit" onClick={()=>onAction("test")}>
                                            Test Connection
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button className={"button button__primary button__small"}
                                                htmlType="submit" onClick={()=>onAction("save")}>
                                            Save
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button className={"button button__primary button__small"}
                                                htmlType="submit" onClick={()=>onAction("connect")}>
                                            Connect
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Button className={"button button__small"} onClick={()=>handleClose()}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>


                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>

            {/*<Modal className={styles.jdbc__modal} closeIcon={null} title="JDBC Advance Option" maskClosable={false} open={state.isOpenDBLogin} onOk={() => handleClose(true)}*/}
            {/*       onCancel={() => handleClose(false)} footer={null} centered={true}>*/}
            {/*   <DynamicTable/>*/}

            {/*</Modal>*/}
        </>

    );
};
