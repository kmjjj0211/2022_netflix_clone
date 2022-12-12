import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { authService } from '../firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { async } from '@firebase/util';

function AuthPage() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error,setError] = useState("");

    const onChange = (e) => {
        // console.log("name",e.target.name)
        const {target:{value}} = e;
        if(e.target.name === "email"){
            setEmail(value)
        }else if(e.target.name === "password"){
            setPassword(value)
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        let data;
        try{
            if(newAccount){
                //create newAccount
               data = await createUserWithEmailAndPassword(authService, email, password);
            }else{
                //log in
                data = await signInWithEmailAndPassword(authService, email, password);
            }
        } catch (error){
            setError(error.message);
        }
    }

    const onSocailClick = e => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authService, provider)
    }

  return (
    <AuthContainer>
        <AuthContent>
            <Img>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png" alt='Netflix logo'  />
            </Img>
            <AuthForm onSubmit={onSubmit}>
                <AuthInput type="email" placeholder='Email' required onChange={onChange} name="email" value={email} />
                <AuthInput type="password" placeholder='Password' required onChange={onChange} name="password" value={password} />
                <AuthSubmit type="submit" value={newAccount ? "Create Account" : "Log In"} />
                <AuthError>{error}</AuthError>           
            </AuthForm>
            <AuthToggle onClick={()=>setNewAccount((prev)=>!prev)}>
                {newAccount ? "Sign In" : "Create Account"}
            </AuthToggle>
            <AuthGoogleLogIn>
                <AuthButton onClick={onSocailClick}>Continue with Google</AuthButton>
            </AuthGoogleLogIn>
        </AuthContent>
    </AuthContainer>
  )
}

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-image: url("https://cdn.arstechnica.net/wp-content/uploads/2022/07/netflix.jpg");
    background-size: auto;
`;
const Img = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 40%;  
      padding-top: 130px;
      margin-bottom: 50px;
    }
`;
const AuthContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 600px;
    background-color: #000;
    border-radius: 20px;
`;
const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative; left: 50%;
    transform: translateX(-50%);
    width: 100%; 
    max-width: 320px;  

`;
const AuthInput = styled.input`
    max-width: 320px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 30px;
    background-color: rgba(255,255,255,1);
    font-size: 12px;
    color: #000;
    border: 1px solid #513736;
`;

const AuthSubmit = styled.input`
    color: #fff;
    border: none;
    max-width: 320px;
    padding: 10px;
    border-radius: 30px;
    background: red;
`;
const AuthError = styled.div`
    font-size: 12px;
    color: red;
`;
const AuthToggle = styled.span`
    display: block;
    width: 100%;
    position: relative; left: 45%;
    margin-top: 20px;
    font-size: 16px;
    color: red;
    text-decoration: underline;
`;
const AuthGoogleLogIn = styled.div`
position: relative;
`;
const AuthButton = styled.button`
position: absolute; left: 50%;
transform: translateX(-50%);
margin-top: 30px;
max-width: 320px;
padding: 10px;
border-radius: 30px;
`;
export default AuthPage