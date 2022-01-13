import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import Pagination from './Pagination';

const Table = ({
	columns,
	data,
	onDeleteAddress,
	onEditAddress
}) => {
	const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
		setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
			initialState: { pageSize: 5 },
    },
    usePagination
  );

	return (
		<>
			<table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
				<thead className="bg-gray-50">
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									{...column.getHeaderProps()}
								>
									{column.render('Header')}
								</th>
							))}
							<th />
							<th />
						</tr>
					))}
				</thead>
				<tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
					{page.map((row, i) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
									<td className="px-6 py-4 whitespace-nowrap" {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								))}
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button
										className="text-indigo-600 hover:text-indigo-900"
										onClick={() => onEditAddress(row.original.id)}
									>
										Edit
									</button>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button
										className="text-indigo-600 hover:text-indigo-900"
										onClick={() => {
											if (window.confirm('Are you sure you wish to delete this item?')) {
												onDeleteAddress(row.original.id);
											}
										}}
									>
										Delete
									</button>
								</td>
              </tr>
            )
          })}
				</tbody>
			</table>
			<Pagination
				canPreviousPage={canPreviousPage}
				canNextPage={canNextPage}
				page={page}
				pageCount={pageCount}
				pageIndex={pageIndex}
				gotoPage={gotoPage}
				nextPage={nextPage}
    		previousPage={previousPage}
				pageSize={pageSize}
				setPageSize={setPageSize}
			/>
		</>
	);
};

export default Table;
