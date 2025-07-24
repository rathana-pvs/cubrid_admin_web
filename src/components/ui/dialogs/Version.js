import React, {useEffect, useState} from "react";
import {Modal, Form, Select, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setAbout, setLoading, setOptimizeDB, setVersion} from "@/state/dialogSlice";
import styles from "@/components/ui/dialogs/dialog.module.css"
import {getOptimizeDB, getTables, getVersion} from "@/utils/api";
import {getAPIParam} from "@/utils/utils";


export default function (){

    const {servers} = useSelector(state => state);
    const {selectedObject} = useSelector(state => state.general);
    const {version} = useSelector(state => state.dialog);
    const dispatch = useDispatch();
    const [versionDetail, setVersionDetail] = useState({});


    const handleOk = async () => {

    };


    const handleClose = () => {
        dispatch((setVersion(false)))
    }

    useEffect(() => {
        if(version){
            const server = servers.find(res=>res.serverId === selectedObject.serverId);

            getVersion({...getAPIParam(server)}).then(res=>{
                setVersionDetail(res.result);
            })
        }

    },[version])

    return (
        <Modal
            width={600}
            title="Cubrid Version"
            open={version}
            footer={() => {
                return (
                    <>
                        <Button type={"primary"} variant={"filled"} className={"button button__small"}
                                onClick={() => handleClose()}>
                            Close
                        </Button>
                    </>
                )
            }}
        >
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div style={{display: "flex", width: '100%', gap: 18}} >
                    <div className={"img__cubrid"}>
                        <img width={80} src={"https://www.cubrid.org/files/attach/images/3771164/522cf9a9415e01599545be25bfd8eab3.png"} alt={"cubrid logo"}/>
                    </div>
                    <p className={styles.db__text__title}>{versionDetail.CUBRIDVER}</p>

                </div>

            </div>
        </Modal>
    );
};

