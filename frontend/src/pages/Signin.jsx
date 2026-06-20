import React, { useState } from 'react'
import { signin } from '../services/AuthService.js';
import { useContext } from 'react';
const Signin = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const onSubmit = async()=>{
    const data={email,password};
    const response = await signin(data);
    console.log(response);
    if(response){
      
    }
  }

  return (
    <>
    <form action="">
      <input type="email" name="email" id="email" onChange={(e)=>{
        setEmail(e.target.value)
      }} />
      <input type="password" name="password" id="password" onChange={(e)=>{
        setPassword(e.target.value)
      }} />
    </form>
    </>
  )
}

export default Signin