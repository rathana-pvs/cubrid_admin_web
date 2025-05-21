import Image from "next/image";
import styles from "@/app/page.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addServer} from "@/state/serverSlice";
import MainLayout from "@/components/layout/MainLayout";

export default function () {


    return (
        <MainLayout/>
    )
}
