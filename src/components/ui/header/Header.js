import React from "react";
import styles from "./header.module.css";
import {Dropdown} from "antd";
import {UserDeleteOutlined} from "@ant-design/icons";
import {nanoid} from "nanoid";
import {useTranslations} from "next-intl";
import {useDispatch, useSelector} from "react-redux";
import FileMenu from "@/components/ui/header/FileMenu";
import ToolMenu from "@/components/ui/header/ToolMenu/ToolMenu";
import ActionMenu from "@/components/ui/header/ActionMenu";
import HelpMenu from "@/components/ui/header/HelpMenu";
import {setLocale} from "@/state/generalSlice";

export default function () {
    const {locale} = useSelector(state => state.general);
    const menus = [] //[file, tools, action, help];
    const t = useTranslations()
    const dispatch = useDispatch();
    const language = [
        {
            label: <b>EN</b>,
            key: nanoid(4),
            onClick: ()=>dispatch(setLocale("en")),
        },
        {
            label: <b>KR</b>,
            key: nanoid(4),
            onClick: ()=>dispatch(setLocale("kr")),
        }
    ]
    // useEffect(() => {
    //     setLocale(lang)
    // },[lang])

    return (
        <div className={styles.layout}>
            <div className={styles.layout__menu}>
                <FileMenu/>
                <ToolMenu/>
                <ActionMenu/>
                <HelpMenu/>
                {/*{[t("header.title.file"), t("header.title.tools"), t("header.title.action"), t("header.title.help")].map((item, index) => (*/}
                {/*    <Dropdown key={index} menu={{ items: menus[index] }} trigger={['click']}>*/}
                {/*        <div className={styles.dropdown__menu} onClick={(e) => e.preventDefault()}>*/}
                {/*            {item}*/}
                {/*        </div>*/}
                {/*    </Dropdown>*/}
                {/*))}*/}
            </div>

            <div className={styles.layout__action}>
                <div className={styles.action__language}>
                    <Dropdown menu={{ items: language }} trigger={['click']}>
                        <div className={styles.dropdown__menu} onClick={(e) => e.preventDefault()}>
                            {locale.toUpperCase()}
                        </div>
                    </Dropdown>
                </div>
                <UserDeleteOutlined />
            </div>
        </div>
    )

}