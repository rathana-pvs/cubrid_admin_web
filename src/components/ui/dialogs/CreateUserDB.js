import React, {useEffect} from "react";
import { Modal, Form, Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setUserDB} from "@/state/dialogSlice";
import {createUserDB, updateUserDB} from "@/utils/api";
import {getAPIParam, isNotEmpty} from "@/utils/utils";
import {setUser} from "@/state/userSlice";
import {nanoid} from "nanoid";

const { Option } = Select;
const { TextArea } = Input;

const CreateUserDB = () => {
    const state = useSelector(state=>state)
    const {userDB, loginDB} = state.dialog
    const {databases, users} = state;
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const handleOk = () => {
        const server = state.servers.find(res=>res.serverId === userDB.node.serverId);
        form.validateFields()
            .then(async (values) => {
                dispatch(setLoading(true))
                let response = {}
                const data = {...getAPIParam(server), ...values, groups: values.groups}
                if(userDB.type === "add"){
                    response = await createUserDB(data);
                    if(response.status){
                        handleClose()
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
                }else {
                        Modal.error({
                            title: 'Error',
                            content: response.note,
                            okText: "Close"
                        })
                }

                }else{

                    response = await updateUserDB(data);

                    if(response.status){
                        handleClose()
                        dispatch(setUser(users.map(res=>{
                            if(res.key === userDB.node.key){
                                const user = {...userDB.node, ...values, groups: [{group: values.groups}]}
                                setUserDB({...userDB, node: user});
                                return user

                            }
                            return res
                        })))
                    }else{
                        Modal.error({
                            title: 'Error',
                            content: response.note,
                            okText: "Close"
                        })
                    }

                }

                dispatch(setLoading(false))
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleClose = () => {
        dispatch(setUserDB({open: false}));
    }

    useEffect(() => {
        if(userDB.open){
            if(userDB.type === "edit"){
                console.log(userDB.node)
                form.setFieldsValue({
                    dbname: loginDB.node.title,
                    username: userDB.node.title,
                    groups: isNotEmpty(userDB.node.groups)? userDB.node.groups[0].group: [],

                })
            }

        }
    }, [userDB]);

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

                >
                    <Select placeholder="Select a database" open={false}>
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
                    <Input placeholder="Enter username" readOnly={userDB.type === "edit"}/>
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
                        {
                            users.filter(res=>res.title !== userDB.node?.title).map(res=>(
                                (<Option key={res.key} value={res.title}>
                                    {res.title}
                                </Option>)
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUserDB;
