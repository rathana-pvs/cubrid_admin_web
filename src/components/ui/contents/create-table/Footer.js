import {Button} from "antd";
import styles from "./CreateTable.module.css";

export default function (){

    return (
        <div className={styles.footer__layout}>
            <Button icon={<i className="fa-light fa-floppy-disk"></i>} variant={"outlined"} color="primary">Save</Button>
            <Button icon={<i className="fa-light fa-rotate-reverse"></i>} variant={"outlined"} color={"danger"}>Revert</Button>
        </div>
    )
}