import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authService } from '../firebase';
import '../styles/Nav.css';

function Nav({userObj}) {
    console.log("userObj",userObj)
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            //console.log("window.scrolly",window.scrollY);
            // 앞에는 콘솔의 제목. 알아보기가 쉽다
            if(window.scrollY > 50){
                setShow(true);
            }else{
                setShow(false)
            }
        });
        //윈도우에 스크롤 이벤트 적용. 그런데 컴포넌트를 더 이상 사용하지 않으면 이벤트를 지워줘여한다.
        return () => {
            window.removeEventListener("scroll", () => {});
        };
    },[]);
 
    const onChange = (e) => {
        setSearchValue(e.target.value)
        navigate(`/search?q=${e.target.value}`)
    }

  return (
    <nav className={`nav ${show && "nav__black"}`}>
        {/* 스크롤이 내려가면 nav의 background가 검정으로 바뀜. 조건을 넣어주기 위해 저렇게 작성 : nav(원래 클래스) show의 값이 true면 nav__black 클래스 추가 */}
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png" 
        // {{userObj.photoURL}}
            alt='Netflix logo' 
            className='nav__logo'
            // 로고를 누를때마다 새로고침이 될수있게.
            onClick={() => (window.location.href = "/netflix_app")}
        />
        <input type="search" value={searchValue} onChange={onChange} placeholder="영화를 검색해주세요." className='nav__input'/>
        <span className='user___name'>
            {userObj.displayName}
        </span>
            {userObj.photoURL ? (
            <img src={userObj.photoURL}
            alt='User logged'
            width="50"
            height="50"
            className='nav__avatar' 
            onClick={()=>{navigate("/profile")}}
            />
        ) : (
            <img src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            alt='User logged'
            // 로그인 기능 추가해주기.
            className='nav__avatar' 
            onClick={()=>{navigate("/profile")}}
            />
        )}
    </nav>
  )
}
{}

export default Nav