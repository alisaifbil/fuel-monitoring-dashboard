import React, { useMemo } from "react";

const Pagination = ({ noOfPages, updatePage, currentPage, showPagination }) => {
  const arrayToShow = useMemo(() => {
    const arr =
      noOfPages > 0
        ? noOfPages > 5
          ? currentPage > 2 && currentPage < noOfPages - 3
            ? [1, "...", currentPage + 1, "...", noOfPages]
            : currentPage <= 2
            ? [1, 2, 3, "...", noOfPages]
            : [1, "...", noOfPages - 2, noOfPages - 1, noOfPages]
          : [...new Array(noOfPages)].map((val, index) => index + 1)
        : [];
    return arr;
  }, [currentPage, noOfPages]);

  return (
    <>
      <div
        className={`flex pt-4 justify-center ${
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
          {arrayToShow?.map((value, index) => (
            <li
              key={index}
              onClick={() => (value === "..." ? null : updatePage(index))}
              className={`${
                value !== "..." ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <a
                className={`flex items-center justify-center px-3 h-8 border border-gray-300 ${
                  currentPage + 1 === Number(value)
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {value}
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
    </>
  );
};

export default Pagination;
