import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../assets/Context/UserAuth";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
type Props = {};
type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};
const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
const RegisterPage = (props: Props) => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });
  const handleLogin = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.userName, form.password);
  };
  return (
    <>
    <h1 style={{textAlign:"center"}}>                Sign up to your account
      </h1>
      <Form className="space-y-4 md:space-y-6"
               onSubmit={handleSubmit(handleLogin)}>
                
                
                <Form.Group className="mb-3">
        <Form.Label>Email </Form.Label>
        <Form.Control type="text"
                   id="email"
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Email"
                   {...register("email")}
                   //className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   
                 />
                 {errors.email ? (
                   <p className="text-white">{errors.email.message}</p>
                 ) : (
                   ""
                 )}

                   
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>UserName </Form.Label>
        <Form.Control type="text"
                   id="username"
                   //className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Username"
                   {...register("userName")} />
                   {errors.userName ? (
                   <p className="text-white">{errors.userName.message}</p>
                 ) : (
                   ""
                 )}
      </Form.Group>

      
<Form.Group className="mb-3">
        <Form.Label>Password </Form.Label>
        <Form.Control type="password"
                   id="password"
                   placeholder="••••••••"
                   //className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   {...register("password")}
                 />
                 {errors.password ? (
                   <p className="text-white">{errors.password.message}</p>
                 ) : (
                   ""
                 )}

                   
      </Form.Group>
      <Button type="submit">
        Sign up
      </Button>
      <h5>         You have an account?{" "}
        <Link  to={"/login"}>Sign in</Link>
      </h5>
      </Form>
    </>
    
  );
};
export default RegisterPage;