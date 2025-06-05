import React, {memo, useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, message, Modal, Row, Select, Space, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import styles from '@/components/ui/dialogs/dialog.module.css'
import {setLoginDB} from "@/state/dialogSlice";
import {getDatabases, loginDatabase} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
import {setDatabase, updateDatabase} from "@/state/databaseSlice";








export default function () {
    const loginDB = useSelector(state => state.dialog.loginDB);
    const servers = useSelector(state => state.servers);
    const databases = useSelector(state => state.databases);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [action, setAction] = useState("")



    const handleSubmit = (values) => {

        form.validateFields().then(async (values) => {
            const server = servers.find(res=>res.serverId === loginDB.node.serverId);
            const response = await loginDatabase({...getAPIParam(server),
                targetid: server.id,
                dbpasswd: values.password,
                dbname: values.database,
                dbuser: values.username,
            })

            if(response.status){
                if(action === "test"){
                    Modal.success({
                        title: 'Success',
                        content: "Successfully logged in",
                        okText: "Close"
                    })
                }else{
                    dispatch(setDatabase(databases.map(res=>{
                        if(res.key === loginDB.node.key){
                            return {...res, isLogin: true};
                        }
                        return res
                    })))
                    handleClose()
                }
            }
        })



    };

    const onAction = (name) => {
        setAction(name);
    }

    function handleClose() {
        dispatch(setLoginDB({...loginDB, open: false}));
        form.resetFields();
    }

    useEffect(()=>{
        if(loginDB.open){
            const {node} = loginDB;
            const server = servers.find(res=>res.serverId === node.serverId);
            form.setFieldsValue({
                host: server.host,
                port: "33000",
                database: node.title,
                username: "dba"
            })
        }

    },[loginDB])

    return (
        <>
            <Modal closeIcon={null} title="Database Login" maskClosable={false} open={loginDB.open} onOk={() => handleClose(true)}
                   onCancel={() => handleClose(false)} footer={null} centered={true}>

                <Form form={form} onFinish={handleSubmit} autoComplete="off" layout="vertical">
                    <Row gutter={[12, 6]}>
                        <Col span={18}>
                            <Form.Item
                                label="Host"
                                name="host"
                            >
                                <Input readOnly/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Port"
                                name="port"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Database"
                                name="database"
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="DB Username"
                                name="username"
                                rules={[{required: true, message: "Required"}]}
                            >
                                <Input placeholder="Enter DB Username"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="DB Password"
                                name="password"
                            >
                                <Input.Password placeholder="Enter password"/>
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{marginTop:24}}>
                            <Form.Item>
                                <Row align="middle" className={styles.action} gutter={[0, 0]} style={{ width: "100%" }}>

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