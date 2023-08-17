import React from "react";
import { useRouter } from "next/navigation";

// if (response.ok) router.push("/dashboard");

const Modal = ({ toggleShow, show, modalDetails }) => {
  const router = useRouter();
  return (
    <div
      id="popup-modal"
      className={`fixed ${
        show ? "" : "hidden"
      } bg-neutral-300/80 top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      onClick={() => {
        toggleShow(false);
        if (modalDetails.responseCode === 201) router.push("/dashboard");
      }}
    >
      <div className="relative flex align-middle content-center md:left-[40%] top-[25%] w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            onClick={() => {
              toggleShow(false);
              if (modalDetails.responseCode === 201) router.push("/dashboard");
            }}
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {modalDetails.modalMessage}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
