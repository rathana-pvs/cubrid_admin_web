import {Card, Typography} from "antd";
import React from "react";
import Meta from "antd/es/card/Meta";
import styles from './ConnectionCard.module.scss'
import Diagram from '../../../../public/diagram.svg'
import {DatabaseOutlined} from "@ant-design/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDatabase} from "@fortawesome/free-solid-svg-icons";
const { Text } = Typography;

const card_color = {
    secondary: styles.card__color__secondary,
    warning: styles.card__color__warning
}
export default function ConnectionCard(props) {
    return (
        <div className="card cursor__pointer">
            <div className="card__wrapper">
                <div className={`${styles.card__color} ${card_color[props.color]}`}>
                    {/*<DatabaseOutlined />*/}
                    <i className="fa-light fa-database"></i>
                </div>
                <div className={styles.card__content}>
                        <div className={styles.card__title}>{props.title}</div>
                        <div className={styles.card__description}>
                            <div><span>Host</span>: {props.server}</div>
                            <div><span>Port</span>: {props.port}</div>
                            <div><span>DB</span>: {props.db}</div>
                        </div>
                </div>
                <div className={styles.card__decor}>
                    <img src={"/database.png"} alt="" />
                </div>
            </div>
        </div>
    )
}