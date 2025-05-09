import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, message, Modal, Row, Select, Space} from "antd";
import {useAppContext} from "@/context/AppContext";
import styles from "./new-connection.module.css";
import {appendToLocalStorage, createServerFormat, getLocalStorage, setLocalStorage} from "@/utils/storage";
import { v4 as uuid } from 'uuid';
import {nanoid} from "nanoid";
import axios from "axios";
import {setRememberPassword} from "@/utils/utils";
export default function () {
    const {state, dispatch} = useAppContext();
    const [form] = Form.useForm();
    const [action, setAction] = useState("")
    const [encryptedPassword, setEncryptedPassword] = useState("")
    const [checkBoxFields, setCheckBoxFields ] = useState({
        autoCommit: false,
        savePassword: false,
        setTimeout: false,
    });


    const handleSubmit = async (values) => {
        const connectionDetails = {
            ...values,
            timeout: -1,
            ...checkBoxFields
            // autoCommit: autoCommit,
        };

        if (action === "save") {
            let connections = []
            let server_id = ""
            if (state.connection.type === "add") {
                const server = createServerFormat(connectionDetails);
                const response = await axios.post("/api/get-encrypt-password", {password: connectionDetails.password});
                if(response.data.success){
                    server.password = response.data.password;
                }
                connections = [...state.servers, server];
                server_id = server.server_id;
            } else {
                const promise = state.servers.map(async (connection) => {
                    if (connection.server_id === state.connection.server_id) {
                        if (connectionDetails.password) {
                            const response = await axios.post("/api/get-encrypt-password", {password: connectionDetails.password});
                            if (response.data.success) {
                                connectionDetails.password = response.data.password;
                            }
                        }else{
                            connectionDetails.password = encryptedPassword;
                        }
                        return {...connection, ...connectionDetails}
                    }
                    return connection;
                })
                connections = await Promise.all(promise)
                server_id = state.connection.server_id;
            }

            dispatch({type: "SERVER_DATA", payload: connections});
            // console.log(connections);
            setRememberPassword(connectionDetails.savePassword, server_id, connections);
            handleClose(true)
        } else if (action === "test") {
            dispatch({type: "LOADING_SCREEN", payload: true});
            let {host, port, id, password} = values;
            if(state.connection.type === "edit"){
                if(!password){
                    password = encryptedPassword;
                }
            }
            const response = await axios.post("/api/login",
                {host, port, id, password})
                .then(res => res.data);
            dispatch({type: "LOADING_SCREEN", payload: false});
            if (response.token) {
                Modal.info({
                    title: "Connection",
                    content: "Connect Successfully",
                    okText: "Close"
                })
            } else {
                Modal.error({
                        title: "Connection Failed",
                        content: response.note,
                        okText: "Close"
                    }
                )
            }
        }
    }
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
                const {autoCommit, savePassword, setTimeout} = server;
                setEncryptedPassword(server.password);
                form.setFieldsValue({...server, password: ""});
                setCheckBoxFields({autoCommit, savePassword, setTimeout});
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
                                <Input placeholder="Enter port (e.g., 8001)"/>
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

                        {/*<Col span={24}>*/}
                        {/*    <Form.Item*/}
                        {/*        label="Cubrid Version"*/}
                        {/*        name="version"*/}
                        {/*    >*/}
                        {/*        <Select defaultValue="11.0">*/}
                        {/*            <Select.Option value="11.0">11.0</Select.Option>*/}
                        {/*            <Select.Option value="11.1">11.1</Select.Option>*/}
                        {/*            <Select.Option value="11.2">11.2</Select.Option>*/}
                        {/*        </Select>*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}



                        {/* Auto-Commit Radio */}
                        <Col span={24}>
                            <Form.Item>

                                <Row align="middle"  style={{ width: "100%" , marginTop: 12}}>
                                    <Col>
                                        <Checkbox name="autoCommit" disabled checked={checkBoxFields.autoCommit} onChange={handleCheckBox}>Auto Commit</Checkbox>
                                        <Checkbox name="savePassword" checked={checkBoxFields.savePassword} onChange={handleCheckBox}>Save Password</Checkbox>
                                        <Checkbox name="setTimeout" disabled checked={checkBoxFields.setTimeout} onChange={handleCheckBox}>Set Timeout</Checkbox>
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
                                <Row align="middle" className={styles.action} gutter={[0, 0]} style={{ width: "100%" }}>

                                    <Col>
                                        <Button type={"primary"} className={"button button__primary button__small"}
                                                htmlType="submit" onClick={()=>onAction("test")}>
                                            Test Connection
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button type={"primary"} className={"button button__small"}
                                                htmlType="submit" onClick={()=>onAction("save")}>
                                            Save
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button type={"primary"} variant={"filled"} className={"button button__small"} onClick={()=>handleClose()}>
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
