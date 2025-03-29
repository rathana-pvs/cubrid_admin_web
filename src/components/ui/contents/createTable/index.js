import {Checkbox, Col, Divider, Form, Input, List, Row, Select, Table, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styles from './CreateTable.module.css'
import {useAppContext} from "@/context/AppContext";
import axios from "axios";
import {getDatabaseLogin} from "@/utils/utils";
import TextArea from "antd/es/input/TextArea";
import Column from "@/components/ui/contents/createTable/Column";


export default function () {
    const {state, dispatch} = useAppContext();
    const [form] = Form.useForm();
    return (
        <div className={styles.layout}>
            <div className={styles.general}>
                <Form form={form}  autoComplete="off" layout="horizontal">
                    <Row gutter={[18, 12]}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ flex: "100px" }}
                                label="Table Name: "
                                name="name"
                            >
                                <Input placeholder="Table Name"/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Owner"
                                name="owner"
                            >
                                <Select defaultValue="11.0">
                                    <Select.Option value="11.0">DBA</Select.Option>
                                    <Select.Option value="11.1">PUBLIC</Select.Option>

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Collation"
                                name="collation"
                            >
                                <Select defaultValue="utf8_en_cs">
                                    <Select.Option value="utf8_bin">utf8_bin</Select.Option>
                                    <Select.Option value="utf8_en_cs">utf8_en_cs</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{ flex: "100px" }}
                                label="Table Memo :"
                                name="host"
                            >
                                <TextArea rows={2}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <label style={{  width:100}}>Reuse OID : </label> {/* Label in front */}
                                <Checkbox />
                            </div>
                        </Col>

                    </Row>
                </Form>
            </div>
            <Divider className={styles.divider} />
            <div className={styles.section__layout}>

                    {/*<List bordered>*/}
                    {/*    <List.Item className={styles.feature__item} >*/}
                    {/*        <span>Column</span>*/}
                    {/*    </List.Item>*/}
                    {/*    <List.Item className={styles.feature__item}>*/}
                    {/*        <span>Index</span>*/}
                    {/*    </List.Item>*/}
                    {/*    <List.Item className={styles.feature__item}>*/}
                    {/*        <span>Partition</span>*/}
                    {/*    </List.Item>*/}
                    {/*    <List.Item className={styles.feature__item}>*/}
                    {/*        <span>DDL</span>*/}
                    {/*    </List.Item>*/}
                    {/*</List>*/}

                    <Tabs
                        className="custom-tabs"
                        bordered
                        tabPosition={"left"}
                        items={["Columns", "Index", "Partition", "DDL"].map((item, i) => {
                            return {
                                label:item,
                                key: i,
                                children: <Column/>,
                            };
                        })}
                    />
                </div>


        </div>
    )
}