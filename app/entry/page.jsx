"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Dashboard from "../dashboard/page";
import Modal from "@/components/Modal";
import FormLabel from "@/libraries/ui-design-system/src/design-system/form-label/page";
import FormInput from "@/libraries/ui-design-system/src/design-system/input/page";

const DashboardComponent = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return <Dashboard />;
};

const RefuelingDetails = () => {
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleName, setVehicleName] = useState("PE");
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState(0.0);
  const [currentMileage, setCurrentMileage] = useState(0);
  const [fillingDate, setDate] = useState("");
  const [petrolStation, setPetrolStation] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    responseCode: "",
    modalMessage: "",
  });
  const [show, toggleShow] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const dateToday = new Date();
    const currentDate =
      dateToday.getFullYear() +
      "-" +
      (dateToday.getMonth() + 1 >= 10
        ? dateToday.getMonth() + 1
        : "0" + (dateToday.getMonth() + 1)) +
      "-" +
      (dateToday.getDate() >= 10
        ? dateToday.getDate()
        : "0" + dateToday.getDate());

    setDate(currentDate);

    const populateVehicleList = async () => {
      const response = await fetch(`/api/admindetails/lovdetails`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();

      const dbVehicleList = data.find((value) => value.name === "vehicleList");

      setVehicleList(dbVehicleList);
    };

    populateVehicleList();
  }, []);

  const createEntry = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      vehicleName !== "" &&
      price > 0 &&
      volume > 0 &&
      currentMileage > 0 &&
      fillingDate !== ""
    ) {
      try {
        const response = await fetch("/api/vehiclerefilldetails/new", {
          method: "POST",
          body: JSON.stringify({
            userId: session?.user.id,
            vehicleName: vehicleName,
            price: price,
            volume: volume,
            currentMileage: currentMileage,
            date: fillingDate,
            petrolStation: petrolStation,
          }),
        });
        setModalDetails({
          responseCode: response.status,
          modalMessage:
            response.status === 201
              ? "The record has been inserted successfully!"
              : response.status === 500
              ? "There was some error while inserting the record!"
              : "There was some network error!",
        });
      } catch (error) {
        console.log(error);
      } finally {
        toggleShow(true);
      }
    } else {
      alert("Fill all required values");
    }
  };

  return (
    <>
      {status === "authenticated" ? (
        <div className="flex justify-center h-max p-4">
          <form className="md:w-[60%] w-full p-2 pt-2 border border-neutral-200 shadow-md">
            <div className="flex justify-center align-center p-4">
              <h3>Enter Vehicle Fuel Details</h3>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2 ">
              <div>
                <FormLabel label="Vehicle Name" />
                {vehicleList?.values.length > 0 ? (
                  <select
                    id="vehicles"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(event) => setVehicleName(event.target.value)}
                    defaultValue="PE"
                    required
                  >
                    {vehicleList?.values.map((value, index) => (
                      <option key={index} value={value.id}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
              <div>
                <FormLabel label="Price" />
                <FormInput
                  type="number"
                  id="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  required={formSubmitted}
                />
              </div>
              <div>
                <FormLabel label="Volume (in Litres)" />
                <FormInput
                  type="number"
                  step="0.01"
                  id="volume"
                  value={volume}
                  onChange={(event) => setVolume(event.target.value)}
                  required={formSubmitted}
                />
              </div>
              <div>
                <FormLabel label="Current Mileage (in KMs)" />
                <FormInput
                  type="number"
                  id="currentMileage"
                  value={currentMileage}
                  onChange={(event) => setCurrentMileage(event.target.value)}
                  required={formSubmitted}
                />
              </div>
              <div>
                <FormLabel label="Date" />
                <FormInput
                  type="date"
                  id="date"
                  value={fillingDate}
                  onChange={(event) => setDate(event.target.value)}
                  required={formSubmitted}
                />
              </div>
              <div>
                <FormLabel label="Petrol Station" />
                <FormInput
                  type="text"
                  id="petrolStation"
                  value={petrolStation}
                  onChange={(event) => setPetrolStation(event.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={(e) => createEntry(e)}
            >
              Submit
            </button>
          </form>
          <Modal
            toggleShow={toggleShow}
            show={show}
            modalDetails={modalDetails}
          />
        </div>
      ) : status === "loading" ? (
        <div>Session Loading...</div>
      ) : (
        <DashboardComponent />
      )}
    </>
  );
};

export default RefuelingDetails;
