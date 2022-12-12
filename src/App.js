import React from 'react'
import { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import AuthPage from './routes/AuthPage'
import DetailPage from './routes/DetailPage'
import MainPage from './routes/MainPage'
import SearchPage from './routes/SearchPage'
import './styles/App.css'
import { authService } from './firebase';
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import ProfilePage from './routes/ProfilePage'
import Routers from './Routers'


// Layout이라는 함수형 컴포넌트
// const Layout = () => {
//   const [show, setShow] = useState(true);
//   const [isLoggedIn,setIsLoggedIn] = useState(authService.currentUser);
//   const [userObj, setUserObj] = useState(null);
//   return (
//     <div>
//       <Nav userObj={userObj} />
//       <Outlet userObj={userObj}/>
//       {/* Outlet : 중첩 라우터, 이 자리에 저 밑에 있는 메인, 서치, 디테일이 들어감 */}
//       <Footer />
//     </div>
//   )
// }

const App = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
        //const uid = user.uid;
      } else {
        setIsLoggedIn(false);
      }
    });
  },[])
  //console.log("authService.currentUser",authService.currentUser)

  return (
    <div className='app'>
      <Routers isLoggedIn={Boolean(userObj)} userObj={userObj}/>
      {/* <Routes>      
          {isLoggedIn ? (
            <>
            <Route path='/' element={<Layout userObj={userObj}/>}>
              <Route index element={<MainPage />} />
              <Route path=':movieId' element={<DetailPage />} />
              <Route path='search' element={<SearchPage />} /> */}
              {/* index: 부모 주소(localhost:3000) 그대로 상속, :movieId : 주소가 param를 받아서, search : 내가 직접 지정. */}
              {/* <Route path='/profile' element={<ProfilePage userObj={userObj} />} />
              <Route path='/' element={<Nav userObj={userObj} />} />
             </Route>
            </>
          ) : (
            <>
            <Route index element={<AuthPage />} />
            </>
          )}
       
      </Routes> */}
      {/* <Nav />
     
      <Footer /> */}
    </div>
  )
}

export default App