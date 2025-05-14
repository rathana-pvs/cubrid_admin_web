import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, Col, Form, Input, message, Modal, Row, Select, Space} from "antd";
import {useAppContext} from "@/context/AppContext";
import styles from "@/components/ui/dialog/dialog.module.css";
import GroupInput from "@/components/ui/group-input/GroupInput";

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


    }
    const handleCancel = () => {

    }

    const handleClose = () => {}

    return (
        <>
            <Modal className={styles.modal} closeIcon={null}
                   title={state.connection.type==="add"? "New Connection": "Edit Connection"}
                   maskClosable={false} open={state.create_database.open}
                   onOk={() => handleClose(true)}
                   onCancel={() => handleClose(false)} footer={null} centered={true}>

                <Form form={form} onFinish={handleSubmit} autoComplete="off" layout="vertical">
                    <Row gutter={[18, 12]}>
                        <Col span={24}>
                            <Form.Item
                                label="Database Name"
                                name="name"
                                rules={[{required: true, message: "Please enter the database Name"}]}
                            >
                                <Input placeholder="database Name"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Page Size (byte)"
                                name="page_size"
                            >
                                <Select defaultValue="11.0">
                                    <Select.Option value="11.0">11.0</Select.Option>
                                    <Select.Option value="11.1">11.1</Select.Option>
                                    <Select.Option value="11.2">11.2</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Collation"
                                name="collation"
                            >
                                <Select defaultValue="11.0">
                                    <Select.Option value="11.0">11.0</Select.Option>
                                    <Select.Option value="11.1">11.1</Select.Option>
                                    <Select.Option value="11.2">11.2</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Volum Size (byte)"
                                name="volume_size"
                                rules={[{required: true, message: "Please enter the volume size"}]}
                            >
                                <Input placeholder="Volume Size"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <GroupInput title="Additional Volumn Information">
                                <Form.Item label="First Name" name="firstName">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Last Name" name="lastName">
                                    <Input />
                                </Form.Item>
                            </GroupInput>
                        </Col>

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
