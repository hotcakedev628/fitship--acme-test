const Pagination = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageCount,
  pageIndex,
  pageSize,
  setPageSize
}) => {
  return (
    <div className="flex justify-start lg:justify-end">
      <select
        name="pageSize"
        className="bg-white max-w-xs block border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[5, 10, 25].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px ml-1" aria-label="Pagination">
        <button
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
        >
          <span className="sr-only">Previous</span>
          &lt;
        </button>
        {
          [...Array(pageCount)].map((elem, i) => (
            <button
              key={i}
              href="#"
              aria-current="page"
              className={`z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer
                ${i === pageIndex
                  ? ` bg-indigo-50 text-indigo-600`
                  : ` bg-white border-gray-300 text-gray-500 hover:bg-gray-50`}
                `}
              onClick={() => gotoPage(i)}
            >
              {i + 1}
            </button>
          ))
        }
        <button
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
          disabled={!canNextPage}
          onClick={() => nextPage()}
        >
          <span className="sr-only">Next</span>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
