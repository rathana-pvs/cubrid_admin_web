import {useAppContext} from "@/context/AppContext";
import {useEffect} from "react";


export default function (object) {
    const {dispatch} = useAppContext();

    useEffect(() => {
        dispatch(object)
    },[])
}