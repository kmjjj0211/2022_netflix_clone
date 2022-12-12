import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService,storage } from '../firebase';
import '../styles/profile.css'
import { FaArrowLeft,FaArrowRight } from 'react-icons/fa';
import { async } from '@firebase/util';
import { updateProfile } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";

function ProfilePage({userObj}) {
    const [newPhotoURL,setNewPhotoURL] = useState(userObj.photoURL);

    const navigate = useNavigate();

    const onLogOut = e => {
        authService.signOut();
        // navigate("/");
    }

    const [newDisplayName,setNewDisplayName] = useState(userObj.displayName);

    const onChange = (e) => {
        const {target:{value,name}} = e;
        if(name === "name"){
            setNewDisplayName(value)
        }}

    const onFileChange = (e) => {
        //console.log(e.target.files);
        const {target: {files}} = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
        console.log(finishedEvent);
        const {currentTarget: {result}} = finishedEvent;
        setNewPhotoURL(result);
        }
        reader.readAsDataURL(theFile)
    }

    const onSubmit = async(e) => {
        e.preventDefault();  
        let photoURL = "";
        if(userObj.photoURL !== newPhotoURL){
            const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(storageRef, newPhotoURL, 'data_url');
            //console.log(response)
            photoURL = await getDownloadURL(ref(storage, response.ref))
            await updateProfile(userObj, {photoURL});
        }
        if(userObj.displayName != newDisplayName){
            await updateProfile(userObj, {displayName: newDisplayName, photoURL: ""});
        }
    }

    
  return (
    <div className='profile'>
        <div className='profile_bg'>
            <FaArrowLeft onClick={()=>navigate("/")}/>
        </div>
        <div className='profile_content'>
            <div className='pro_img'>
                {newPhotoURL ? (
                    <>
                    <img src={newPhotoURL} alt="user_profile_image" width="100" height="100"/>
                    <button className='clear' onClick={()=>{setNewPhotoURL("")}}>Clear</button>
                    </>
                ) : (
                    <img src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41" alt="user_profile_image" />
                )}
            </div>
            <div className='pro_name'>
                <form onSubmit={onSubmit}>
                    <fieldset>
                        <legend className='blind'>프로필바꾸기</legend>
                        {/* 이름바꾸기 */}
                        <input type="text" className="profile_name" name='name' id='userName' autoFocus onChange={onChange} value={newDisplayName}/>
                        
                        {/* 프로필 사진 */}
                        <label htmlFor="file_add" className='file_add'>+</label>
                        <input className='blind' id='file_add' type="file" accept='image/*' onChange={onFileChange}/>

                        {/* 제출 */}
                        <input className='profile_submit' type="submit" id='profile_change' name='submit' value="Update Profile" />
                    </fieldset>
                </form> 
            </div>
            <div className='log_out'>
                <span onClick={onLogOut}>LogOut</span>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage