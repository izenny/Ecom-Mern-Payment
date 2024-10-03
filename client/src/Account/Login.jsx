import CommonForm from '@/Components/Common/Form'
import { loginFormControls } from '@/Config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const initialState ={
  email : '',
  password:''
}
const Login = () => {
  const [formData,setFormData] =useState(initialState)
  const onSubmit = ()=>{

  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h1>
        <p className="">Don't have an account
        <Link
          to={"/auth/register"}
          className="font-medium ml-2 text-primary hover:underline"
        >
          Register
        </Link>
        </p>

        
      </div>
      <CommonForm
      formControls={loginFormControls}
      buttonText={'Sign In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default Login