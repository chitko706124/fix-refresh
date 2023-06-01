import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useGetContentQuery } from "../services/api/contentApi";
import { useDispatch, useSelector } from "react-redux";
import { addPath, addUser } from "../services/search";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useElementSize } from "@mantine/hooks";
// import { data } from "autoprefixer";
// import Header from "../components/Header";

const ContactList = () => {
  const token = Cookies.get("token");
  const user = JSON?.parse(Cookies.get("user"));
  const { data: content, isLoading } = useGetContentQuery(token);
  const cartItems = useSelector((state) => state.search.cartItems);
  console.log(cartItems);
  // console.log(content?.contacts.data);
  const search = useSelector((state) => state.search.search);
  // const path = useSelector((state) => state.path.path);
  const dispatch = useDispatch();

  // function renderContent() {
  // dispatch()
  // }

  useEffect(() => {
    dispatch(addUser(user));
  });

  useEffect(() => {
    {
      isLoading ? dispatch(addPath("")) : dispatch(addPath("contactList"));
    }
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" flex items-center justify-center">
          <div className="w-[800px] mt-20 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {content?.contacts.data
                  .filter((item) => {
                    if (search === "") {
                      return item;
                    } else {
                      return item.name.toLowerCase().includes(search);
                    }
                  })
                  .map((item) => {
                    return (
                      <tr
                        key={item?.id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{item?.name}</td>
                        <td className="px-6 py-4">{item?.email}</td>
                        <td className="px-6 py-4">{item?.phone}</td>
                        <td className="px-6 py-4">{item?.address}</td>
                        <td className="px-6 py-4">
                          <Link to={`/detail/${item?.id}`}>
                            <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                              Detail
                            </p>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactList;
