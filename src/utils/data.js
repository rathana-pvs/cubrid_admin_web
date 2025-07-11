import CubridConfig from "@/components/ui/contents/config-param/CubridConfig";
import {nanoid} from "nanoid";
import CubridBrokerConfig from "@/components/ui/contents/config-param/CubridBrokerConfig";
import CMConfig from "@/components/ui/contents/config-param/CMConfig";


export const CONFIG_PARAM_CONTENT = [
    {label: "Edit Cubrid Config", screen: <CubridConfig/>, key: nanoid(8)},
    {label: "Edit Broker Config", screen: <CubridBrokerConfig/>, key: nanoid(8)},
    {label: "Cubrid Manager Config", screen: <CMConfig/>, key: nanoid(8)},
]

