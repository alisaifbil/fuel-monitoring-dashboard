import React, { useEffect, useState } from "react";

const RecentRefills = (data) => {

    const [displayData , setDisplayData ] = useState([]);

    useEffect(() => {
        const sortedData = data?.data?.sort(
            (recent, old) => new Date(old.date) - new Date(recent.date)
          );
        const displayDataArray = sortedData.slice(0, 5);

        setDisplayData(displayDataArray);
    }, [])
    


  return (
    <div className="flex relative overflow-x-auto rounded-lg">
      {displayData.length > 0 ? (<table className="grow text-xs text-center text-gray-500 border ">
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
          {displayData.map((record , index) => (
            <tr className="bg-white border-b" key={index}>
            <th
              scope="row"
              className="px-[2.5%] py-[1.875%] font-medium text-gray-900 whitespace-nowrap"
            >
              {record.date.split('T')[0]}
            </th>
            <td className="px-[2.5%] py-[1.875%]">{record.vehicleName}</td>
            <td className="px-[2.5%] py-[1.875%]">Rs. {record.price}</td>
            <td className="px-[2.5%] py-[1.875%]">{record.volume}</td>
            <td className="px-[2.5%] py-[1.875%]">{record.currentMileage}</td>
          </tr>
          ))}
          {/* <tr className="bg-white border-b">
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
          </tr> */}
        </tbody>
      </table>): null}
    </div>
  );
};

export default RecentRefills;
