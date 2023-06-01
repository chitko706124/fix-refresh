import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useGetContentQuery } from "../services/api/contentApi";
import { useDispatch, useSelector } from "react-redux";
import { addPath } from "../services/search";
import Header from "../components/Header";
// import { data } from "autoprefixer";
// import Header from "../components/Header";

const ContactList = () => {
  const token = Cookies.get("token");
  const { data: content, isLoading } = useGetContentQuery(token);
  console.log(content?.contacts.data);
  const search = useSelector((state) => state.search.search);
  // const path = useSelector((state) => state.path.path);
  const dispatch = useDispatch();

  // function renderContent() {
  // dispatch()
  // }

  useEffect(() => {
    dispatch(addPath("contactList"));
  }, [dispatch]);

  return (
    <>
      {/* <Header /> */}
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
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item?.name}
                      </th>
                      <td className="px-6 py-4">{item?.email}</td>
                      <td className="px-6 py-4">{item?.phone}</td>
                      <td className="px-6 py-4">{item?.address}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ContactList;
