import React, { useEffect, useState } from "react";

const RecentRefills = ({data , vehicleList}) => {

    const [displayData , setDisplayData ] = useState([]);
    const vehcileNames = vehicleList;

    useEffect(() => {
        
        const sortedData = data?.sort(
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
            <td className="px-[2.5%] py-[1.875%]">{vehcileNames[record.vehicleName].name}</td>
            <td className="px-[2.5%] py-[1.875%]">Rs. {record.price}</td>
            <td className="px-[2.5%] py-[1.875%]">{record.volume}</td>
            <td className="px-[2.5%] py-[1.875%]">{record.currentMileage}</td>
          </tr>
          ))}
        </tbody>
      </table>): null}
    </div>
  );
};

export default RecentRefills;
