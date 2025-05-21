import React, { useState } from 'react';
import {
    Table,
    Button,
    Input,
    Modal,
    Form,
    Select,
    message, Space,
} from 'antd';

const { Option } = Select;

const EditableUserTable = () => {
    const [data, setData] = useState([
        {
            key: '1',
            username: 'admin',
            dbAuth: 'admin',
            brokerAuth: 'none',
            monitorAuth: 'monitor',
        },
    ]);

    const [selectedKey, setSelectedKey] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = () => {
        const record = data.find((item) => item.key === selectedKey);
        if (!record) return;
        setEditingRecord(record);
        form.setFieldsValue({
            username: record.username,
            dbAuth: record.dbAuth,
            brokerAuth: record.brokerAuth,
            monitorAuth: record.monitorAuth,
            password: '',
            confirmPassword: '',
        });
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== selectedKey));
                setSelectedKey(null);
                message.success('User deleted');
            },
        });
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const { confirmPassword, ...userData } = values;
            if (editingRecord) {
                setData((prev) =>
                    prev.map((item) =>
                        item.key === editingRecord.key ? { ...item, ...userData } : item
                    )
                );
                message.success('User updated');
            } else {
                const newKey = `${Date.now()}`;
                setData((prev) => [...prev, { ...userData, key: newKey }]);
                message.success('User created');
            }
            setIsModalVisible(false);
            setSelectedKey(null);
        });
    };

    const authorityOptions = ['none', 'admin', 'monitor'].map((level) => (
        <Option key={level} value={level}>
            {level}
        </Option>
    ));

    const columns = [
        { title: 'Username', dataIndex: 'username' },
        {
            title: 'DB Creation Authority',
            dataIndex: 'dbAuth',
            className: 'no-wrap',
        },
        {
            title: 'Broker Authority',
            dataIndex: 'brokerAuth',
            className: 'no-wrap',
        },
        {
            title: 'Status Monitor Authority',
            dataIndex: 'monitorAuth',
            className: 'no-wrap',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button danger type="link" onClick={() => handleDelete(record)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>


            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowClassName={(record) =>
                    record.key === selectedKey ? 'selected-row' : ''
                }
                onRow={(record) => ({
                    onClick: () => setSelectedKey(record.key),
                })}
            />
            <div style={{ marginTop: 16, display:"flex", justifyContent: "flex-end" }}>
                <Button type="primary" onClick={handleAdd} style={{ marginRight: 8 }}>
                    Add
                </Button>
            </div>

            <Modal
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSubmit}
                title={editingRecord ? 'Edit User' : 'Add User'}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter a username' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter a password' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm the password',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('Passwords do not match')
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="dbAuth"
                        label="DB Creation Authority"
                        rules={[{ required: true, message: 'Please select a value' }]}
                    >
                        <Select>{authorityOptions}</Select>
                    </Form.Item>

                    <Form.Item
                        name="brokerAuth"
                        label="Broker Authority"
                        rules={[{ required: true, message: 'Please select a value' }]}
                    >
                        <Select>{authorityOptions}</Select>
                    </Form.Item>

                    <Form.Item
                        name="monitorAuth"
                        label="Status Monitor Authority"
                        rules={[{ required: true, message: 'Please select a value' }]}
                    >
                        <Select>{authorityOptions}</Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditableUserTable;
