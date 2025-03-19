import React from 'react';
import {Tabs } from 'antd';
import {useAppContext} from "@/context/AppContext";

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
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={state.panel_active}
                type="editable-card"
                onEdit={onEdit}
                items={state.contents}
            />
    );
};
export default Content;