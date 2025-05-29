import React, {useEffect, useState} from 'react';
import {Button,  Col, Form, Input,  Modal, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import styles from '@/components/ui/dialogs/dialog.module.css'









export default function () {
    const {backupDB} = useSelector(state => state.dialog);
    const {servers} = useSelector(state => state);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [action, setAction] = useState("")



    const handleSubmit = (values) => {

        form.validateFields().then(async (values) => {
            const server = servers.find(res=>res.serverId === backupDB.node.serverId);
            

        //     if(response.status){
        //         if(action === "test"){
        //             Modal.success({
        //                 title: 'Success',
        //                 content: "Successfully logged in",
        //                 okText: "Close"
        //             })
        //         }else{
        //
        //             handleClose()
        //         }
        //     }else{
        //         Modal.error({
        //             title: 'Error',
        //             content: response.note,
        //             okText: "Close"
        //         })
        //     }
        })



    }

    const onAction = (name) => {
        setAction(name);
    }

    function handleClose() {
        // dispatch(setLoginDB({...backupDB, open: false}));
        form.resetFields();
    }

    useEffect(()=>{
        if(backupDB.open){
            const {node} = backupDB;
            const server = servers.find(res=>res.serverId === node.serverId);

        }

    },[backupDB])

    return (
        <>
            <Modal closeIcon={null} title="Backup Database" maskClosable={false} open={backupDB.open} onOk={() => handleClose(true)}
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