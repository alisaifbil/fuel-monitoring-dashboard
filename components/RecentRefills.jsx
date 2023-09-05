import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const RecentRefills = ({ data, vehicleList, noOfRecords, showPagination }) => {
  const [displayData, setDisplayData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const vehcileNames = vehicleList;

  useEffect(() => {
    const sortedData = data?.sort(
      (recent, old) => new Date(old.date) - new Date(recent.date)
    );
    const displayDataArray = noOfRecords
      ? sortedData.slice(0, noOfRecords)
      : sortedData;

    setDisplayData(displayDataArray);
  }, []);

  const updatePageNumber = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex relative overflow-x-auto rounded-lg">
      {displayData.length > 0 ? (
        <div className="flex flex-col w-full">
          <table className="text-xs text-center text-gray-500 border ">
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
              {displayData
                .slice(currentPage * 5, (currentPage + 1) * 5)
                .map((record, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <th
                      scope="row"
                      className="px-[2.5%] py-[1.875%] font-medium text-gray-900 whitespace-nowrap"
                    >
                      {record.date.split("T")[0]}
                    </th>
                    <td className="px-[2.5%] py-[1.875%]">
                      {
                        vehcileNames.find(
                          (vehicle) => vehicle.id === record.vehicleName
                        ).name
                      }
                    </td>
                    <td className="px-[2.5%] py-[1.875%]">
                      Rs. {record.price}
                    </td>
                    <td className="px-[2.5%] py-[1.875%]">{record.volume}</td>
                    <td className="px-[2.5%] py-[1.875%]">
                      {record.currentMileage}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination
            noOfPages={Math.ceil(displayData.length / 5)}
            updatePage={updatePageNumber}
            currentPage={currentPage}
            showPagination={showPagination}
          />
        </div>
      ) : null}
    </div>
  );
};

export default RecentRefills;
