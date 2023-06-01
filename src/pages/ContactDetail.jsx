// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu } from "@mantine/core";
import { Button } from "flowbite-react";
import {
  useDeleteContactMutation,
  useGetContactDetailQuery,
  useGetContentQuery,
} from "../services/api/contentApi";
import Cookies from "js-cookie";
import Loading from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addPath, addToCart } from "../services/search";

const ContactDetail = () => {
  const token = Cookies.get("token");
  const { data: content } = useGetContentQuery(token);
  console.log(content?.contacts.data);
  const { id } = useParams();
  const { data, isLoading } = useGetContactDetailQuery({ id, token });
  const [deleteContact] = useDeleteContactMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const binContact = content?.contacts.data.filter((item) => item.id === parseInt(id));
  console.log(binContact)
  useEffect(() => {
    {
      isLoading ? dispatch(addPath("")) : dispatch(addPath("contactList"));
    }
  });

  // const bin = JSON?.parse(Cookies.get("bin"));
  // console.log(bin);

  const notify = () => toast.error("Content is deleted");

  const deleteHandler = async () => {
    const data = await deleteContact({ id, token });
    console.log(data);
    // dispatch(addBin(data));
    if (data?.data?.success) {
      //  dispatch(addBin(binContact));
      dispatch(addToCart(binContact));
      notify();
      nav("/");
    }
    // console.log(data);
  };

  //   console.log(data);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="my-5 grid grid-cols-12 grid-rows-4 gap-1">
            <div className=" row-start-1 row-end-2 col-start-2 lg:col-start-2 ">
              <Link to={"/"}>
                <button>
                  <AiOutlineLeft className=" text-2xl" />
                </button>
              </Link>
            </div>
            <div className="col-start-5 col-span-4 md:col-start-2 row-span-4 md:col-span-4 md:row-span-4 flex flex-wrap md:flex-nowrap justify-center align-middle items-center gap-10">
              <img
                src={
                  data?.contact?.photo === null
                    ? "https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg"
                    : data?.contact?.photo
                }
                width={"150px"}
                className=" rounded-full"
              />
              <div className=" flex flex-col">
                <p className=" text-2xl">{data?.contact?.name}</p>
                <p className=" text-md text-gray-500">{data?.contact?.phone}</p>
              </div>
            </div>
            <div className="col-start-11 col-span-2 row-start-1 row-span-2 md:col-start-11 md:col-span-4 md:row-start-1 md:row-span-2">
              <Menu width={150}>
                <Menu.Target>
                  <Button variant="">
                    <BsThreeDotsVertical className=" text-2xl" />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Link to={`/edit/${id}`}>
                    <Menu.Item target="_blank">
                      <p className=" cursor-pointer text-center">Edit User</p>
                    </Menu.Item>
                  </Link>

                  <Menu.Item>
                    <p
                      className=" cursor-pointer text-red-500 text-center"
                      onClick={() => deleteHandler(id)}
                    >
                      Delete User
                    </p>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>

          <hr />

          <div className=" grid grid-cols-12 gap-0 my-5">
            <div className=" col-start-2 col-span-10 md:col-start-2 md:col-span-4 lg:col-start-3 lg:col-span-3 border-2 border-black rounded-lg p-5">
              <h4 className=" text-lg">User Details</h4>
              <hr />
              <p>
                Email :{" "}
                {data?.contact?.email === null
                  ? "example@gmail.com"
                  : data?.contact?.email}
              </p>
              <p>Phone : {data?.contact?.phone}</p>
              <p>
                Address :{" "}
                {data?.contact?.address === null
                  ? "Bahan TownShip"
                  : data?.contact?.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactDetail;
