import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, message, Modal, Row, Select, Space} from "antd";
import {useAppContext} from "@/context/AppContext";
import styles from "./new-connection.module.css";
import {appendToLocalStorage, createServerFormat, getLocalStorage, setLocalStorage} from "@/utils/storage";
import { v4 as uuid } from 'uuid';
import {nanoid} from "nanoid";
export default function () {
    const {state, dispatch} = useAppContext();
    const [form] = Form.useForm();
    const [action, setAction] = useState("")
    const [checkBoxFields, setCheckBoxFields ] = useState({
        autoCommit: false,
        savePassword: false,
        setTimeout: false,
    }); // Default auto-commit value


    const handleSubmit = (values) => {
        const connectionDetails = {
            ...values,
            timeout: -1,
            ...checkBoxFields
            // autoCommit: autoCommit,
        };

        if(action === "save"){
            if(state.connection.type === "add"){
                connectionDetails.server_id = nanoid(8);
                const server = createServerFormat(connectionDetails)
                const connections = [...state.servers, server];
                setLocalStorage("connections", connections);
                dispatch({type: "SERVERS", payload: connections})
            }else{
                const connections = state.servers.map((connection) => {
                    if(connection.server_id === state.connection.server_id){
                        return createServerFormat({...connection,...connectionDetails})
                    }
                    return connection;
                })
                setLocalStorage("connections", connections);
                dispatch({type: "SERVERS", payload: connections});

            }

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
        dispatch({type: "CONNECTION", payload:{...state.connection, open:false}});
        if(status){
            form.resetFields();
        }

    }
    useEffect(() => {
        if(state.connection.open){
            form.resetFields();
            if(state.connection.type === "edit"){
                const server = state.servers.find(s => s.server_id === state.connection.server_id);
                form.setFieldsValue(server);
            }
        }

    }, [state.connection]);

    return (
        <>
            <Modal className={styles.modal} closeIcon={null}
                   title={state.connection.type==="add"? "New Connection": "Edit Connection"}
                   maskClosable={false} open={state.connection.open}
                   onOk={() => handleClose(true)}
                   onCancel={() => handleClose(false)} footer={null} centered={true}>

                <Form form={form} onFinish={handleSubmit} autoComplete="off" layout="vertical">
                    <Row gutter={[18, 0]}>
                        <Col span={24}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{required: true, message: "Please enter the name"}]}
                            >
                                <Input placeholder="Enter name"/>
                            </Form.Item>
                        </Col>

                        {/* Host Input */}
                        <Col span={16}>
                            <Form.Item
                                label="Host"
                                name="host"
                                rules={[{required: true, message: "Please enter the host"}]}
                            >
                                <Input placeholder="Enter host (e.g., localhost)"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            {/* Port Input */}
                            <Form.Item
                                label="Port"
                                name="port"
                                rules={[{required: true, message: "Please enter the port"}]}
                            >
                                <Input placeholder="Enter port (e.g., 3306)"/>
                            </Form.Item>
                        </Col>


                        {/* User Input */}
                        <Col span={24}>
                            <Form.Item
                                label="User"
                                name="id"
                                rules={[{required: true, message: "Please enter the username"}]}
                            >
                                <Input placeholder="Enter username"/>
                            </Form.Item>

                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{message: "Please enter the password"}]}
                            >
                                <Input.Password placeholder="Enter password" autoComplete="new-password"/>
                            </Form.Item>
                        </Col>


                        {/* Database Input */}

                        <Col span={24}>
                            <Form.Item
                                label="Cubrid Version"
                                name="version"
                            >
                                <Select defaultValue="11.0">
                                    <Select.Option value="11.0">11.0</Select.Option>
                                    <Select.Option value="11.1">11.1</Select.Option>
                                    <Select.Option value="11.2">11.2</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        {/* Auto-Commit Radio */}
                        <Col span={24}>
                            <Form.Item>

                                <Row align="middle"  style={{ width: "100%" }}>
                                    <Col>
                                        <Checkbox name="autoCommit" onChange={handleCheckBox}>Auto Commit</Checkbox>
                                        <Checkbox name="savePassword" onChange={handleCheckBox}>Save Password</Checkbox>
                                        <Checkbox name="setTimeout" onChange={handleCheckBox}>Set Timeout</Checkbox>
                                    </Col>
                                    <Col flex="auto">
                                        <Select defaultValue={-1} disabled={!checkBoxFields.setTimeout} style={{ width: "100%" }}>
                                            <Select.Option value={10}>10S</Select.Option>
                                            <Select.Option value={30}>30S</Select.Option>
                                            <Select.Option value={60}>60S</Select.Option>
                                            <Select.Option value={-1}>no limit</Select.Option>
                                        </Select>
                                    </Col>
                                </Row>

                            </Form.Item>

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
        </>
    );
};
