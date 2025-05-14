import React from "react";

export default function({ title, children }) {
    return <div style={{position: 'relative', border: '1px solid #d9d9d9', borderRadius: 4, padding: 12, marginTop: 8}}>
        <div
            style={{
                position: 'absolute',
                top: -12,
                left: '6%',
                transform: 'translateX(-6%)',
                background: '#fff',
                padding: '0 8px',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}
        </div>
        {children}
    </div>
};