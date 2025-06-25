import styles from "@/components/ui/dialogs/dialog.module.css";
import {Button, Col, Divider, Form, Input, Popconfirm, Row, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import ManageBroker from "@/components/ui/dialogs/property/ManageBroker";
import {nanoid} from "nanoid";
import {getCubridBrokerConfig, setCubridBrokerConfig} from "@/utils/api";
import {useDispatch, useSelector} from "react-redux";
import {extractBroker, extractParam, getAPIParam, getAssembleBroker} from "@/utils/utils";
import {setLoading} from "@/state/dialogSlice";
import {confirmAction} from "@/utils/ui-action";

export default function (){
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [selectedKey, setSelectedKey] = useState(null);
    const [manage, setManage] = useState({open: false});
    const {property} = useSelector(state => state.dialog);
    const {servers} = useSelector(state => state);
    const [server, setServer] = useState({});
    const [brokerData, setBrokerData] = useState([]);
    const [originBroker, setOriginBroker] = useState(null);
    const [saveData, setSaveData] = useState([]);
    const [editData, setEditData] = useState([]);
    const [title, setTitle] = useState(null);
    const [data, setData] = useState([]);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Port",
            dataIndex: "port",
        }
    ]


    const handleSave = async () => {

        const extractData = extractBroker(originBroker)
        extractData["broker"] = form.getFieldsValue()
        if(title){
            extractData[`%${title}`] = Object.fromEntries(
                saveData.map(res => [res.parameter, res.value])
            );
        }


        const finalData = getAssembleBroker(extractData)
        await submitRequest(finalData);

    };

    const submitRequest = async (finalData) => {
        dispatch(setLoading(true))
        const response = await setCubridBrokerConfig({...getAPIParam(server), confdata: finalData})
        if (response.status) {
            await getRefreshData(server)
            dispatch(setLoading(false))
        }
    }

    const handleDelete = async () => {
        const object = data.find(res => res.key === selectedKey);
        confirmAction({
            content: `Are you sure to delete broker: ${object.name}`,
            onOk: async () => {
                const extractData = extractBroker(originBroker)
                delete extractData[`%${object.name}`]
                const finalData = getAssembleBroker(extractData)
                await submitRequest(finalData);
            },


        })


    };

    const getRefreshData = async (server) => {
        dispatch(setLoading(true));
        getCubridBrokerConfig({...getAPIParam(server)}).then(res => {
            if (res.status) {
                setOriginBroker(res.result.conflist[0].confdata)
                const data = extractParam(res.result.conflist[0].confdata)
                setBrokerData(data[0])
                const broker = data[0].broker
                form.setFieldsValue({
                    ...broker
                })
                setData(Object.keys(data[0]).filter(res => res !== "broker").map(res => {
                    return {
                        key: nanoid(4),
                        name: res.replace("%", ""),
                        port: data[0][res]["BROKER_PORT"]
                    }
                }))
            }
        })
    }

    useEffect(() => {
        const server = servers.find(res => res.serverId === property.node.serverId)
        setServer(server);
        getRefreshData(server).then(res=>dispatch(setLoading(false)));

    }, []);

    return <div className={styles.property__layout__content}>
        <Form form={form} layout="horizontal">
            <Row gutter={[0, 6]}>
                <Col span={24}>
                    <Form.Item labelCol={{span: 6}} label="MASTER_SHM_ID" name="MASTER_SHM_ID">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item labelCol={{span: 6}} label="ADMIN_LOG_FILE" name="ADMIN_LOG_FILE">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item labelCol={{span: 6}} label="ACCESS_CONTROL" name="ACCESS_CONTROL">
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item labelCol={{span: 6}} label="ACCESS_CONTROL_FILE" name="ACCESS_CONTROL_FILE">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

        </Form>

        <Divider orientation="left">Broker List</Divider>

        <Table
            className={"clickable__table"}
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
            bordered

            rowClassName={(record) =>
                record.key === selectedKey ? "row__selected" : ""
            }
            onRow={(record) => ({
                onClick: () => {
                    setSelectedKey(record.key);
                },
            })}
        />
        <div style={{display: "flex", justifyContent: "flex-end", gap: 12, padding: "12px 0"}}>
            <Button type={"primary"} className={"button__width__80"}
                    onClick={()=>setManage({open: true, type: "add"})}>Add</Button>
            <Button disabled={!selectedKey} type={"primary"}
                    className={"button__width__80"}
                    onClick={()=>{
                        const object = data.find(res => res.key === selectedKey);
                        console.log(object);
                        setManage({open: true, type: "edit", editData: object});
                    }}>Edit</Button>
            <Button disabled={!selectedKey}
                    onClick={handleDelete}
                    type={"primary"} className={"button__width__80"} danger>Delete</Button>
        </div>

        <Divider style={{margin: "6px 0"}}/>

        <div style={{display: "flex", justifyContent: "flex-end", gap: 12, padding: "12px 0"}}>
            <Button type={"primary"} onClick={handleSave} className={"button__width__80"}
                    >Save</Button>
            <Button type={"primary"}
                    className={"button__width__80"}
                    >Cancel</Button>
        </div>
        <ManageBroker {...manage} brokerData={brokerData} onSave={
            (title, data)=>{
                setTitle(title);
                setSaveData(data)
            }
        }
                      onClose={()=>setManage({open: false})} />
    </div>
}