import React from 'react';
import {
    CloseCircleOutlined, ExpandAltOutlined,
    MinusSquareOutlined,
} from '@ant-design/icons';
import {theme, Radio, Button} from 'antd';

import styles from './layout.module.scss';
import IconButton from "@/components/ui/button/IconButton";
import SideProperty from "@/components/ui/side-property";
import SideTree from "@/components/ui/side-tree";
import SideTreeBackup from "@/components/ui/side-tree/SideTreeBackup";

const App = () => {
    return (

           <div className={"sidebar"}>
               <div className={styles.top__menu}>
                   <div className={styles.mode__view}>
                       <Radio.Group
                           defaultValue={"host"}
                       >
                           <Radio.Button value="host">Host</Radio.Button>
                           <Radio.Button value="monitor">Monitor</Radio.Button>
                       </Radio.Group>
                   </div>
                   <div className={styles.left__menu__button}>
                       <IconButton>
                           <MinusSquareOutlined />
                       </IconButton>
                       <IconButton>
                           <CloseCircleOutlined />
                       </IconButton>
                       <IconButton>
                           <ExpandAltOutlined />
                       </IconButton>


                   </div>
               </div>
               <div className={styles.tree__container}>
                   <SideTreeBackup/>
               </div>

               {/*<div className={styles.side__property}>*/}
               {/*    <SideProperty/>*/}
               {/*</div>*/}

           </div>

    );
};
export default App;