import React from 'react'
import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";
import { useCreateContentMutation} from "../services/api/contentApi"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
    const form = useForm({
        initialValues: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
    
        validate: {
          // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });
    
      const [createContent] = useCreateContentMutation();
      const token = Cookies.get("token");
      const nav = useNavigate();
      return (
        <div className="  flex justify-center items-center mt-20">
          <form
            onSubmit={form.onSubmit(async (values) => {
              const { data } = await createContent({ token, content: values });
              if (data?.success) {
                nav("/");
              }
              console.log(data);
            })}
            className=" w-96 p-7 flex flex-col gap-10 shadow-lg "
          >
            <h2>Create</h2>
            <TextInput
              placeholder="Enter Your Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder="Enter Your Email"
              {...form.getInputProps("email")}
            />
            <TextInput
              placeholder="Enter Your Phone"
              {...form.getInputProps("phone")}
            />
            <TextInput
              placeholder="Enter Your Address"
              {...form.getInputProps("address")}
            />
            <button onClick={()=> nav("/")} className=" bg-blue-500 text-white py-1" type="submit">Back</button>
            <button className=" bg-blue-500 text-white py-1" type="submit">
              Create
            </button>
          </form>
        </div>
      );
    
  
}

export default CreateContact