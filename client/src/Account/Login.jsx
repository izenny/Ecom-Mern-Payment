import CommonForm from '@/Components/Common/Form'
import { loginFormControls } from '@/Config'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/Redux/AuthSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const initialState ={
  email : '',
  password:''
}
const Login = () => {
  const [formData,setFormData] =useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        console.log(data);
        
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
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