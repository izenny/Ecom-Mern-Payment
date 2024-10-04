import CommonForm from "@/Components/Common/Form";
import { registerFormControls } from "@/Config";
import { useToast } from "@/hooks/use-toast";

import { registerUser } from "@/Redux/AuthSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  username: "", // Use "username"
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload.success) {
        console.log(data);
        toast({
          title: data?.payload.message,
          status: "success",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "Registration failed",
          description:
            data?.payload?.message || "An error occurred. Please try again.",
          status: "error",
          variant :'destructive'
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
        <p className="">
          Already have an account?
          <Link
            to={"/auth/login"}
            className="font-medium ml-2 text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
