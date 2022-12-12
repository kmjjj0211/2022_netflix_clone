import React, { useEffect } from 'react'

function useOnClickOutside(ref, handler) {
    useEffect(()=>{
        console.log("ref",ref)
        const listener = (event) => {
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {//컴포넌트가 언마운트 될때 이벤트 리스터들을 삭제
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
    },[ref, handler])
}

export default useOnClickOutside