import React, { useState } from 'react'
import { useEffect } from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Row from "./components/Row";
import DetailPage from "./routes/DetailPage";
import MainPage from "./routes/MainPage";
import SearchPage from "./routes/SearchPage";
import ProfilePage from './routes/ProfilePage'
import AuthPage from './routes/AuthPage'


function Routers({isLoggedIn,userObj}) {
    const [show, setShow] = useState(true);
  const Layout = () => {
    if(show === true){
      return (
        <div>
          <Nav userObj={userObj} />
          <Outlet />
          {/* Outlet : 중첩 라우터, 이 자리에 저 밑에 있는 메인, 서치, 디테일이 들어감 */}
          <Footer />
        </div>
      )
    }
  
  }



  return (
    <Routes>
        {isLoggedIn ? (
            <>
            <Route path='/' element={<Layout userObj={userObj}/>}>
              <Route index element={<MainPage />} />
              <Route path=':movieId' element={<DetailPage />} />
              <Route path='search' element={<SearchPage />} />
              {/* index: 부모 주소(localhost:3000) 그대로 상속, :movieId : 주소가 param를 받아서, search : 내가 직접 지정. */}
              <Route path='/profile' element={<ProfilePage userObj={userObj} />} />
              <Route path='/' element={<Nav userObj={userObj} />} />
             </Route>
            </>
          ) : (
            <>
            <Route index element={<AuthPage />} />
            </>
          )}
    </Routes>
  )
}

export default Routers