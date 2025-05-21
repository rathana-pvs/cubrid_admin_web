import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setUserDB} from "@/state/dialogSlice";
import {createUserDB} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";
import {setUser} from "@/state/userSlice";
import {nanoid} from "nanoid";

const { Option } = Select;
const { TextArea } = Input;
const dbOptions = [
    { label: "main_db", value: "main_db" },
    { label: "test_db", value: "test_db" },
];

const groupOptions = [
    { label: "admin", value: "admin" },
    { label: "read_only", value: "read_only" },
];
const CreateUserDB = () => {
    const state = useSelector(state=>state)
    const {userDB} = state.dialog
    const {databases, users} = state;
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const handleOk = () => {
        const server = state.servers.find(res=>res.serverId === userDB.node.serverId);
        form
            .validateFields()
            .then(async (values) => {
                // form.resetFields();
                const response = await createUserDB({...getAPIParam(server), ...values});
                if(response.status){
                    dispatch(setUser([...users,  {
                        serverId: userDB.node.serverId,
                        parentId: userDB.node.key,
                        title: values.username,
                        key: `${userDB.node.key}-${nanoid(8)}`,
                        type: "user",
                        icon: <i className="fa-light fa-user success"/>,
                        isLeaf: true,
                        ...values
                    }]))
                }


            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleClose = () => {
        dispatch(setUserDB({open: false}));
    }

    return (
        <Modal
            title="Create User DB"
            open={userDB.open}
            onCancel={handleClose}
            onOk={handleOk}
            okText="Create"
            cancelText="Cancel"
        >
            <Form form={form} layout="vertical" name="create_user_form">
                <Form.Item
                    name="dbname"
                    label="Database"
                    rules={[{ required: true, message: "Please select a database" }]}
                >
                    <Select placeholder="Select a database">
                        {databases.map((db) => (
                            <Option key={db.key} value={db.title}>
                                {db.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: "Please enter a username" }]}
                >
                    <Input placeholder="Enter username" />
                </Form.Item>

                <Form.Item
                    name="userpass"
                    label="Password"
                    rules={[{ required: false, message: "Please enter a password" }]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={["userpass"]}
                    hasFeedback
                    rules={[
                        { required: false, message: "Please confirm the password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("userpass") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("The two passwords do not match!")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Re-enter password" />
                </Form.Item>

                <Form.Item name="memo" label="Memo">
                    <TextArea rows={3} placeholder="Optional memo" />
                </Form.Item>

                <Form.Item name="groups" label="Groups">
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Select user groups"
                    >
                        {users.map((res) => (
                            <Option key={res.key} value={res.title}>
                                {res.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUserDB;
