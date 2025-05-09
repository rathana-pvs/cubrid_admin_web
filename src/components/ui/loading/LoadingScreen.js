import React, {useContext} from 'react';
import { motion } from 'framer-motion';
import styles from './Loading.module.css';
import AppContext from "antd/es/app/context";
import {useAppContext} from "@/context/AppContext";

const LoadingScreen = () => {
    const {state} = useAppContext()
    const {loading_screen} = state;
    return (
        <div className={styles.container} style={!loading_screen ? {display: "none"} : null}>
            <div style={{ display: 'flex' }}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={styles.dot}
                        animate={{
                            y: [0, -12, 0],
                            opacity: [1, 0.6, 1],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            repeatDelay: 0.1,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default LoadingScreen;
