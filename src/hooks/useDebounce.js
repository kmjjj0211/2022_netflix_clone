import React, { useEffect, useState } from 'react'
// 훅함수를 만들어서 사용할수있음.

export const useDebounce = (value, delay) => {
    //  delay: 입력중, 입력 끝날때 멈추는 시간
    const [debounceValue,setDebounceValue] = useState(value);
    
    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceValue(value);
        },delay);
        
// setTimeout이 실행을 하지않으면 clearTimeout실행.
        return () => {
            clearTimeout(handler);
        }

    },[value,delay]);

    return debounceValue;
}