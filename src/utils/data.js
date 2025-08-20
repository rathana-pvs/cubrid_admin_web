import CubridConfig from "@/components/ui/contents/config-param/CubridConfig";
import {nanoid} from "nanoid";
import CubridBrokerConfig from "@/components/ui/contents/config-param/CubridBrokerConfig";
import CMConfig from "@/components/ui/contents/config-param/CMConfig";
import UnifyCubridConfig from "@/components/ui/contents/unify-setting/CubridConfig"
import UnifyBrokerConfig from "@/components/ui/contents/unify-setting/BrokerConfig"
import UnifyCMConfig from "@/components/ui/contents/unify-setting/CMConfig"
import SQLEditor from "@/components/ui/contents/editor/SQLEditor";
export const CONFIG_PARAM_CONTENT = [
    {label: "Edit Cubrid Config", screen: <CubridConfig/>, key: nanoid(8)},
    {label: "Edit Broker Config", screen: <CubridBrokerConfig/>, key: nanoid(8)},
    {label: "Cubrid Manager Config", screen: <CMConfig/>, key: nanoid(8)},
]

export const UNIFY_SETTING_CONTENT = [
    {label: "Unify Setting (cubrid.conf)", screen: <UnifyCubridConfig/>, key: nanoid(8)},
    {label: "Unify Setting (cubrid_broker.conf)", screen: <UnifyBrokerConfig/>, key: nanoid(8)},
    {label: "Unify Setting (cm.conf)", screen: <UnifyCMConfig/>, key: nanoid(8)}
]

export const TOP_TOOL = ()=>[
    {label: "SQL Editor", children: <SQLEditor/>, key: nanoid(8)},
]