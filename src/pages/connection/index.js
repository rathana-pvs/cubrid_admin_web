import React from 'react';
import {Card, Row, Col, Typography, Menu} from 'antd';
import { EditOutlined, DeleteOutlined, DatabaseOutlined, DesktopOutlined, LinkOutlined } from '@ant-design/icons';
import ConnectionCard from "@/components/ui/ConnectionCard/ConnectionCard";
import styled from "styled-components";
import {Header} from "antd/es/layout/layout";


// Mock data for connections
const connections = [
    { title: 'Connection 1', server: 'localhost', port: 33000, db: 'demodb', color:"secondary"},
    { title: 'Connection 2', server: 'localhost', port: 33001, db: 'demodb' },
    { title: 'Connection 3', server: 'localhost', port: 33002, db: 'demodb', color:"warning" },
    { title: 'Connection 4', server: 'localhost', port: 33003, db: 'demodb' },
    { title: 'Connection 5', server: 'localhost', port: 33004, db: 'demodb' },
    { title: 'Connection 6', server: 'localhost', port: 33005, db: 'demodb' },
];


const Layout = styled.div`
  display: flex;
    justify-content: center;
    
    
    
`;
const Wrapper = styled.div`
    max-width: 1200px;
    padding: 24px;
`;

const CardsPage = () => {
    return (
        <>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Wrapper>
                    <Row gutter={[16, 16]}>
                        {connections.map((connection, index) => (
                            <Col key={index} xs={24} sm={24} md={12} lg={12} xl={8}>
                                <ConnectionCard {...connection} />
                            </Col>
                        ))}
                    </Row>
                </Wrapper>

            </Layout>
        </>

    );
};

export default CardsPage;
