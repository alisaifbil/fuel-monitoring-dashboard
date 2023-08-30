import React from "react";

const Pagination = ({ noOfPages, updatePage, currentPage, showPagination }) => {
  return (
    <>
      {noOfPages > 0 ? (
        <div
          className={`flex pt-4 justify-center cursor-pointer ${
            showPagination ? "block" : "hidden"
          }`}
        >
          <ul className="inline-flex -space-x-px text-sm">
            <li
              onClick={() =>
                updatePage(currentPage - 1 < 0 ? 0 : currentPage - 1)
              }
            >
              <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                Previous
              </a>
            </li>
            {Array(noOfPages)
              .fill(1)
              .map((value, index) => (
                <li key={index} onClick={() => updatePage(index)}>
                  <a
                    className={`flex items-center justify-center px-3 h-8 border border-gray-300 ${
                      currentPage === index
                        ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                        : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
            <li
              onClick={() =>
                updatePage(
                  currentPage + 1 >= noOfPages ? noOfPages - 1 : currentPage + 1
                )
              }
            >
              <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                Next
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
