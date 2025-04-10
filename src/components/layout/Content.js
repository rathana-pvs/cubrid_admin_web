import React from 'react';
import {Tabs } from 'antd';
import {useAppContext} from "@/context/AppContext";
import TabPane from "antd/es/tabs/TabPane";
import TableTest from "@/components/ui/contents/create-table/TableTest";
import Brokers from "@/components/ui/contents/brokers";
import Servers from "@/components/ui/contents/servers";
import {nanoid} from "nanoid";

const Content = () => {
    const {state, dispatch} = useAppContext()
    const onChange = (key) => {
        dispatch({type: "PANEL_ACTIVE", payload: key});
    };
    const remove = (targetKey) => {
        const {contents, panel_active} = state;
        const remainObject = contents.filter(pane => pane.key !== targetKey);
        if(remainObject.length && (targetKey === panel_active)) {
            const activeKey = remainObject[remainObject.length - 1].key;
            dispatch({type: "PANEL_ACTIVE", payload: activeKey});
        }
        dispatch({type: "CONTENTS", payload: remainObject});

    };
    const onEdit = (targetKey, action) => {
        if (action !== 'add') {
            remove(targetKey);
        }
    };
    return (
        <div style={{height:'100%'}}>
            <Tabs
                className={"create__table"}
                style={{height:'100%'}}
                hideAdd
                onChange={onChange}
                activeKey={state.panel_active}
                type="editable-card"
                onEdit={onEdit}
                items={state.contents}>

            </Tabs>
            {/*<Tabs*/}
            {/*    className={"create__table"}*/}
            {/*    style={{height:'100%'}}*/}
            {/*    hideAdd*/}
            {/*    onChange={onChange}*/}
            {/*    type="editable-card"*/}
            {/*    onEdit={onEdit}*/}
            {/*    activeKey={"t1"}*/}
            {/*    items={[{label: "test", children: <Servers />, key: "t1"}]}>*/}

            {/*</Tabs>*/}

        </div>

    );
};
export default Content;