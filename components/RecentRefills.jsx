import React from "react";

const RecentRefills = () => {
  return (
    <div className="flex relative overflow-x-auto rounded-lg">
      <table className="grow text-xs text-center text-gray-500 border ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-[2.5%] py-[1.875%]">
              Date
            </th>
            <th scope="col" className="px-[2.5%] py-[1.875%]">
              Vehicle
            </th>
            <th scope="col" className="px-[2.5%] py-[1.875%]">
              Price
            </th>
            <th scope="col" className="px-[2.5%] py-[1.875%]">
              Litres
            </th>
            <th scope="col" className="px-[2.5%] py-[1.875%]">
              Mileage
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-[2.5%] py-[1.875%] font-medium text-gray-900 whitespace-nowrap"
            >
              3/August
            </th>
            <td className="px-[2.5%] py-[1.875%]">Peugeot</td>
            <td className="px-[2.5%] py-[1.875%]">Rs.11227</td>
            <td className="px-[2.5%] py-[1.875%]">38.32</td>
            <td className="px-[2.5%] py-[1.875%]">8001</td>
          </tr>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-[2.5%] py-[1.875%] font-medium text-gray-900 whitespace-nowrap "
            >
              2/August
            </th>
            <td className="px-[2.5%] py-[1.875%]">Honda 150</td>
            <td className="px-[2.5%] py-[1.875%]">Rs. 3010</td>
            <td className="px-[2.5%] py-[1.875%]">11</td>
            <td className="px-[2.5%] py-[1.875%]">2632</td>
          </tr>
          <tr className="bg-white  border-b">
            <th
              scope="row"
              className="px-[2.5%] py-[1.875%] font-medium text-gray-900 whitespace-nowrap "
            >
              2/August
            </th>
            <td className="px-[2.5%] py-[1.875%]">Peugeot</td>
            <td className="px-[2.5%] py-[1.875%]">Rs. 1000</td>
            <td className="px-[2.5%] py-[1.875%]">3.65</td>
            <td className="px-[2.5%] py-[1.875%]">7982</td>
          </tr>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[2.5%] py-[1.875%] font-medium text-gray-900 whitespace-nowrap "
            >
              31/July
            </th>
            <td className="px-[2.5%] py-[1.875%]">Wagon R</td>
            <td className="px-[2.5%] py-[1.875%]">Rs. 8770</td>
            <td className="px-[2.5%] py-[1.875%]">34.56</td>
            <td className="px-[2.5%] py-[1.875%]">40743</td>
          </tr>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="px-[2.5%] py-[1.875%] font-medium text-gray-900 whitespace-nowrap "
            >
              21/July
            </th>
            <td className="px-[2.5%] py-[1.875%]">Wagon R</td>
            <td className="px-[2.5%] py-[1.875%]">Rs. 7351</td>
            <td className="px-[2.5%] py-[1.875%]">28.97</td>
            <td className="px-[2.5%] py-[1.875%]">40254</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentRefills;
