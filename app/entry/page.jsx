"use client";

import React, { useState } from "react";

const RefuelingDetails = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState(0.0);
  const [currentMileage, setCurrentMileage] = useState(0);
  const [fillingDate, setDate] = useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 > 10
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1)) +
      "-" +
      new Date().getDate()
  );
  const [petrolStation, setPetrolStation] = useState("");

  return (
    <div className="flex justify-center h-max p-4">
      <form className="md:w-[60%] w-full p-2 pt-2 border border-neutral-200 shadow-md">
        <div className="flex justify-center align-center p-4">
          <h3>Enter Vehicle Fuel Details</h3>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 ">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Vehicle Name
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => setVehicleName(event.target.value)}
              required
            >
              <option value="PE">Peugueot</option>
              <option value="WR">Wagon R</option>
              <option value="HC">Honda 150</option>
              <option value="YY">YBR-G</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Volume (in Litres)
            </label>
            <input
              type="number"
              step="0.01"
              id="volume"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={volume}
              onChange={(event) => setVolume(event.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Current Mileage (in KMs)
            </label>
            <input
              type="number"
              id="currentMileage"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={currentMileage}
              onChange={(event) => setCurrentMileage(event.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={fillingDate}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Petrol Station
            </label>
            <input
              type="text"
              id="petrolStation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={petrolStation}
              onChange={(event) => setPetrolStation(event.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RefuelingDetails;
