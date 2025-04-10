import {Checkbox, Col, Divider, Form, Input, List, Row, Select, Table, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import styles from './CreateTable.module.css'
import {useAppContext} from "@/context/AppContext";
import axios from "axios";
import {getDatabaseLogin} from "@/utils/utils";
import TextArea from "antd/es/input/TextArea";
import Column from "@/components/ui/contents/create-table/Column";
import FK from "@/components/ui/contents/create-table/FK";
import IndexKey from "@/components/ui/contents/create-table/IndexKey";
import Footer from "@/components/ui/contents/create-table/Footer";
import TableTest from "@/components/ui/contents/create-table/TableTest";

const Features = [<Column/>, <FK/>, <IndexKey/>, <TableTest/>]

export default function () {
    const {state, dispatch} = useAppContext();
    const [form] = Form.useForm();
    return (
        <div className={styles.layout}>
            <div>
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
                    <Tabs
                        className="create__table"
                        bordered
                        style={{width: ""}}
                        tabPosition={"left"}
                        items={["Columns", "Foreign Key", "Index", "Partition", "DDL"].map((item, i) => {
                            return {
                                label:item,
                                key: i,
                                children: <div style={{height:"100%"}}>{Features[i]}</div>,
                            };
                        })}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    )
}