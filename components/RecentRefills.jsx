import React from "react";

const RecentRefills = () => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-xs text-center text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Date
            </th>
            <th scope="col" className="px-4 py-3">
              Vehicle
            </th>
            <th scope="col" className="px-4 py-3">
              Price
            </th>
            <th scope="col" className="px-4 py-3">
              Litres
            </th>
            <th scope="col" className="px-4 py-3">
              Mileage
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              3/August
            </th>
            <td className="px-4 py-4">Peugeot</td>
            <td className="px-4 py-4">Rs.11227</td>
            <td className="px-4 py-4">38.32</td>
            <td className="px-4 py-4">8001</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              2/August
            </th>
            <td className="px-4 py-4">Honda 150</td>
            <td className="px-4 py-4">Rs. 3010</td>
            <td className="px-4 py-4">11</td>
            <td className="px-4 py-4">2632</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 border-b">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              2/August
            </th>
            <td className="px-4 py-4">Peugeot</td>
            <td className="px-4 py-4">Rs. 1000</td>
            <td className="px-4 py-4">3.65</td>
            <td className="px-4 py-4">7982</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              31/July
            </th>
            <td className="px-4 py-4">Wagon R</td>
            <td className="px-4 py-4">Rs. 8770</td>
            <td className="px-4 py-4">34.56</td>
            <td className="px-4 py-4">40743</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              21/July
            </th>
            <td className="px-4 py-4">Wagon R</td>
            <td className="px-4 py-4">Rs. 7351</td>
            <td className="px-4 py-4">28.97</td>
            <td className="px-4 py-4">40254</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentRefills;
