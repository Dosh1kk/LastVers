import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../assets/Context/UserAuth";
import { Button, Form, NavLink } from "react-bootstrap";
import { Link,} from "react-router-dom";
type Props = {};
type LoginFormsInputs = {
  userName: string;
  password: string;
};
const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
const LoginPage = (props: Props) => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.userName, form.password);
  };
  return (
    <>
      <h1 style={{textAlign:"center"}}>                Sign in to your account
      </h1>
      <Form className="space-y-4 md:space-y-6"
               onSubmit={handleSubmit(handleLogin)}>
      <Form.Group className="mb-3">
        <Form.Label>UserName </Form.Label>
        <Form.Control type="text"
                   id="username"
                   placeholder="Username"
                   {...register("userName")} />
                   {errors.userName ? (
                   <p className="text-white">{errors.userName.message}</p>
                 ) : (
                   ""
                 )}
      </Form.Group>

<Form.Group className="mb-3">
        <Form.Label>UserName </Form.Label>
        <Form.Control type="password"
                   id="password"
                   placeholder="••••••••"
                   {...register("password")}
                 />
                 {errors.password ? (
                   <p className="text-white">{errors.password.message}</p>
                 ) : (
                   ""
                 )}

                   
      </Form.Group>
      <Button type="submit">
        Sign in
      </Button>
      <h5>         Don’t have an account yet?{" "}
        <Link  to={"/register"}>Sign up</Link>
      </h5>

      </Form> 
    </>
    
  );
};
export default LoginPage;