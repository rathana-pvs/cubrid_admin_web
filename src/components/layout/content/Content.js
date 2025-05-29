import React from 'react';
import {Tabs } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {deleteContents, setActivePanel} from "@/state/generalSlice";


const Content = () => {
    const {activePanel, contents} = useSelector(state => state.general);
    const dispatch = useDispatch();
    const onChange = (key) => {
        dispatch(setActivePanel(key));
    };
    const remove = (targetKey) => {

        if(contents.length > 1) {
            const activeKey = contents.at(-2).key;
            console.log(activeKey)
            dispatch(setActivePanel(activeKey));

        }
        dispatch(deleteContents(targetKey));

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
                activeKey={activePanel}
                type="editable-card"
                onEdit={onEdit}
                items={contents}>

            </Tabs>

        </div>

    );
};
export default Content;