import React from "react";
import { useForm } from "@mantine/form";

import { PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../services/authSlice";

const Login = () => {
  const datas = useSelector((state) => state.auth);

  const form = useForm({
    initialValues: {
      email: "Jacksiron123@gmail.com",
      password: "kyawminnthant123456",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value < 5 ? "Your password must be at least 5 cha" : null,
    },
  });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [login] = useLoginMutation();
  return (
    <div>
      <form
        className=" bg-white shadow-md  lg:w-[450px] sm:w-[50%] md:w-[50%] mx-auto my-20 p-5"
        onSubmit={form.onSubmit(async (values) => {
          console.log(values);
          try {
            const { data } = await login(values);
            console.log(data);

            dispatch(addUser({ user: data?.user, token: data?.token }));

            if (data?.success) {
              // dispatch(setHeader());
              nav(`/`);
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <p className=" text-2xl text-black font-bold my-3">
          Login Your Account
        </p>

        <TextInput
          mt="sm"
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          mt="sm"
          label="Password"
          placeholder="Password"
          min={0}
          max={99}
          {...form.getInputProps("password")}
        />

        <div className=" flex gap-3 my-3">
          <p className=" text-gray-600">Doesn't have an account?</p>
          <Link className="  text-gray-600 underline" to={`/Register`}>
            Signup
          </Link>
        </div>

        <button className=" text-white p-2 bg-blue-700 text-center flex justify-center w-full mt-5">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
