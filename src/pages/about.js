import React, { useState } from 'react';
import {Layout, Upload, Button, Table, Descriptions, message, Row, Col} from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const SqliteHandler = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    // Handle file upload
    const handleUpload = (file) => {
        const newFile = {
            uid: file.uid,
            name: file.name,
            size: file.size,
            type: file.type,
        };
        setFiles([...files, newFile]);
        message.success(`${file.name} uploaded successfully.`);
        return false; // Prevent default upload behavior
    };

    // Handle file deletion
    const handleDelete = (fileUid) => {
        const updatedFiles = files.filter((file) => file.uid !== fileUid);
        setFiles(updatedFiles);
        if (selectedFile && selectedFile.uid === fileUid) {
            setSelectedFile(null);
        }
        message.success('File deleted successfully.');
    };

    // Handle file selection
    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    // Table columns
    const columns = [
        {
            title: 'File Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (size) => `${(size / 1024).toFixed(2)} KB`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record.uid)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ color: 'white', fontSize: '20px', textAlign: 'center' }}>
                SQLite File Handler
            </Header>
            <Content style={{ padding: '24px' }}>
                <div style={{ marginBottom: '24px' }}>
                    <Upload
                        beforeUpload={handleUpload}
                        showUploadList={false}
                        accept=".sqlite,.db"
                    >
                        <Button icon={<UploadOutlined />}>Upload SQLite File</Button>
                    </Upload>
                </div>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Table
                            dataSource={files}
                            columns={columns}
                            rowKey="uid"
                            onRow={(record) => ({
                                onClick: () => handleFileSelect(record),
                            })}
                            rowClassName={(record) =>
                                selectedFile && selectedFile.uid === record.uid ? 'selected-row' : ''
                            }
                        />
                    </Col>
                    <Col span={12}>
                        {selectedFile ? (
                            <Descriptions title="File Details" bordered>
                                <Descriptions.Item label="File Name">
                                    {selectedFile.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="File Size">
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                </Descriptions.Item>
                                <Descriptions.Item label="File Type">
                                    {selectedFile.type}
                                </Descriptions.Item>
                            </Descriptions>
                        ) : (
                            <div style={{ textAlign: 'center', color: 'gray' }}>
                                Select a file to view details.
                            </div>
                        )}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default SqliteHandler;