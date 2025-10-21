import React from 'react';
import style from './storeItem.module.css'


export default function StoreDetail({ store, onClose }) {
    
    if (!store) return ;
    
    return (
        <div>
            <h1>상세페이지를 입력하세요.</h1>
            {onClose && (<button className={style.close} onClick={onClose}>닫기</button>)}
            
        </div>
    );
}