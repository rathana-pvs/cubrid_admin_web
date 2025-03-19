import React from 'react';
import { Tabs } from 'antd';
const onChange = (key) => {
    console.log(key);
};
const text = "Explanation\n" +
    "colorPrimary → Changes the selected tree item background color.\n" +
    "colorTextLightSolid → Changes the text color of the selected item.\n" +
    "controlItemBgHover → Changes the hover background color.\n" +
    "This is the recommended Ant Design v5+ approach for theming instead of overriding CSS manually. Let me know if you need more tweaks! 🚀" +
    "Explanation\n" +
    "colorPrimary → Changes the selected tree item background color.\n" +
    "colorTextLightSolid → Changes the text color of the selected item.\n" +
    "controlItemBgHover → Changes the hover background color.\n" +
    "This is the recommended Ant Design v5+ approach for theming instead of overriding CSS manually. Let me know if you need more tweaks! 🚀" +
    "Explanation\n" +
    "colorPrimary → Changes the selected tree item background color.\n" +
    "colorTextLightSolid → Changes the text color of the selected item.\n" +
    "controlItemBgHover → Changes the hover background color.\n" +
    "This is the recommended Ant Design v5+ approach for theming instead of overriding CSS manually. Let me know if you need more tweaks! 🚀"
const App = () => (
    <Tabs
        size={"small"}
        onChange={onChange}
        type="card"
        items={["Column", "Index", "DDL", "ERD Preview"].map((label, id) => {

            return {
                label: label,
                key: id,
                children: `Content of Tab Pane ${label}`,
            };
        })}
    />
);
export default App;