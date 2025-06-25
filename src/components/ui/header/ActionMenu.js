import {Dropdown} from "antd";
import styles from "@/components/ui/header/header.module.css";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addContents, setActivePanel, setContents} from "@/state/generalSlice";
import {nanoid} from "nanoid";
import CubridConfig from "@/components/ui/contents/config-param/CubridConfig";
import CubridBrokerConfig from "@/components/ui/contents/config-param/CubridBrokerConfig";
import {CONFIG_PARAM_CONTENT} from "@/utils/data";





export default function (){
    const {selectedObject, contents} = useSelector(state => state.general);
    const disabled = selectedObject.type !== "server";
    const connection = useSelector(state => state.dialog.connection);
    const dispatch = useDispatch();
    console.log(CONFIG_PARAM_CONTENT)
    const menus = [
        {
            label: 'Show Host Dashboard',
        },
        {
            label: 'Server Version'
        },
        {
            label: 'Properties',
            disabled: !selectedObject.type,

        },
        {
            label: 'Config Params',
            disabled: !selectedObject.type,
            children: CONFIG_PARAM_CONTENT.map(param=>{
                return {...param,
                        onClick:()=>{
                            const checkObject = contents.find(item => item.key === param.key) || false
                            if(!checkObject){
                                dispatch(addContents({ ...selectedObject, ...param, children:param.screen }))
                            }
                            dispatch(setActivePanel(param.key))

                        }
                };
            })
        },

    ];

    return (
        <Dropdown menu={{items: menus}}>
            <div className={styles.dropdown__menu} onClick={(e) => e.preventDefault()}>
                Action
            </div>
        </Dropdown>
    )
}