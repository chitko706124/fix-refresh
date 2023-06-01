import { TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/api/authApi";
const Register = () => {
  const form = useForm({
    initialValues: {
      name: "Jacksiron",
      email: "Jacksiron123@gmail.com",
      password: "kyawminnthant123456",
      password_confirmation: "kyawminnthant123456",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 5
          ? "Password should have at least 5 words(letters,words or both) "
          : null,
    },
  });
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  return (
    <div className=" ">
      <form
        onSubmit={form.onSubmit(async (values) => {
          console.log(values);
          try {
            // const user = { name, email, password, password_confirmation };
            const { data } = await register(values);
            console.log(data);

            if (data?.success) {
              navigate(`/login`);
            }
          } catch (error) {
            console.log(error);
          }
        })}
        action=""
        className=" bg-white shadow-md  lg:w-[450px] sm:w-[50%] md:w-[50%] mx-auto my-20 p-5"
      >
        <h1 className=" text-2xl mb-5 font-bold">Register your account</h1>
        <div className="flex flex-col gap-4">
          <div className="">
            <p>Name</p>
            <TextInput
              {...form.getInputProps("name")}
              placeholder="Your name"
              withAsterisk
              className="w-full"
            />
          </div>

          <div className="">
            <p>Email</p>
            <TextInput
              {...form.getInputProps("email")}
              placeholder="Enter your email"
              withAsterisk
              className="w-full"
            />
          </div>

          <div className="">
            <p>Password</p>

            <PasswordInput
              {...form.getInputProps("password")}
              placeholder="Password"
              description="Password must include at least one letter, number and special character"
              withAsterisk
              className="w-full"
            />
          </div>

          <div className="">
            <p>Password confirmation</p>

            <PasswordInput
              {...form.getInputProps("password_confirmation")}
              placeholder="Confirm Password"
              description="Password must include at least one letter, number and special character"
              withAsterisk
              className="w-full"
            />
          </div>

          <div className="flex gap-3">
            <p className=" font-bold text-gray-500">Already have an account?</p>
            <Link to={`/login`}>
              <p className=" underline  text-gray-500">Login</p>
            </Link>
          </div>
          <div className="">
            <button className=" bg-blue-900 text-white p-2 w-full rounded-md mt-3">
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
