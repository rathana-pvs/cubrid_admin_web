import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Table} from "antd";
import {useAppContext} from "@/context/AppContext";
import styles from "@/components/ui/dialog/dialog.module.css";
import Action from "@/components/ui/dialog/user-management/Action";


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const data = [
    {
        key: '1',
        name: 'John Smith',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'Jane Doe',
        age: 28,
        address: '123 Elm Street',
    },
];
export default function () {
    const {state, dispatch} = useAppContext();
    const [selectedKey, setSelectedKey] = useState(null);

    const handleClose = () => {
        dispatch({type: "USER_MANAGEMENT", payload: {open: false}});
    }
    console.log(state.user_management)
    return (
        <>
            <Modal closeIcon={null}
                   width="auto"
                   title={"User Management"}
                   maskClosable={false} open={state.user_management.open}
                   onOk={() => handleClose(true)}
                   onCancel={() => handleClose(false)} footer={()=>{
                       return <Button type={"primary"} variant={"filled"} className={"button button__small"} onClick={()=>handleClose()}>
                           Cancel
                       </Button>
            }} centered={true}>
                {/*<Table columns={columns} dataSource={data}*/}
                {/*       rowClassName={(record) =>*/}
                {/*           record.key === selectedKey ? styles.selected__row : ''*/}
                {/*       }*/}
                {/*       onRow={(record) => ({*/}
                {/*           onClick: () => {*/}
                {/*               setSelectedKey(record.key);*/}
                {/*           },*/}
                {/*       })}*/}
                {/*       bordered pagination={false} />;*/}
                <Action/>

            </Modal>
        </>
    );
};
