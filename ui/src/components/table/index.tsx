import { useMemo } from 'react'
import { useTable, Column, HeaderGroup, useSortBy } from 'react-table'
import { useHistory } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Paper,
  Skeleton,
  colors,
  TableSortLabel
} from '@mui/material'

import { TablePaginationActions, UsePaginationResult } from './Pagination'

export const DataTable = function <TData extends object & { id?: string }>({
  items,
  columns,
  isLoading,
  goesToPath,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  total
}: Props<TData>) {
  const { push } = useHistory()
  const memoizedColumns = useMemo(() => columns, [columns])
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: memoizedColumns,
      data: items
    },
    useSortBy
  )

  const LoadingRows = generateLoadingRows<TData>(headerGroups[0].headers)

  const Results = items.length ? (
    rows.map(row => {
      const id = row.original.id
      prepareRow(row)
      if (goesToPath) {
        if (!id) throw new Error('Row value must have property `id`  if using navigation')
        return (
          <TableRow
            hover
            onClick={() => push(`${goesToPath}/${id}`)}
            {...row.getRowProps()}
            sx={{ backgroundColor: ({ palette: { background } }) => background.paper }}
          >
            {row.cells.map(cell => {
              return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
            })}
          </TableRow>
        )
      }
      return (
        <TableRow
          hover
          {...row.getRowProps()}
          sx={{ backgroundColor: ({ palette: { background } }) => background.paper }}
        >
          {row.cells.map(cell => {
            return (
              <TableCell sx={{ padding: '3px' }} {...cell.getCellProps()}>
                {cell.render('Cell')}
              </TableCell>
            )
          })}
        </TableRow>
      )
    })
  ) : (
    <TableRow sx={{ height: 200, backgroundColor: ({ palette: { background } }) => background.paper }}>
      <TableCell colSpan={12}>
        <Box sx={{ textAlign: 'center' }}>No Results</Box>
      </TableCell>
    </TableRow>
  )

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '70vh' }}>
        <Table {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    sx={{ backgroundColor: colors['grey'][900] }}
                    {...column.getHeaderProps(column.getSortByToggleProps)}
                    sortDirection={column.isSortedDesc ? 'desc' : 'asc'}
                  >
                    <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'}>
                      {column.render('Header')}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>{isLoading ? LoadingRows : Results}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        rowsPerPageOptions={[15, 30, 50, { label: 'All', value: -1 }]}
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            'aria-label': 'rows per page'
          },
          native: true
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  )
}

const generateLoadingRows = function <TData extends object>(headers: HeaderGroup<TData>[]) {
  return [1, 2, 3].map(num => (
    <TableRow key={num}>
      {headers.map(column => (
        <TableCell key={column.id}>
          <Skeleton variant='rectangular' />
        </TableCell>
      ))}
    </TableRow>
  ))
}

interface Props<TData extends object> extends UsePaginationResult {
  items: TData[]
  columns: Column<TData>[]
  isLoading: boolean
  /** If present, rows will be rendered as Links, and will navigate to `/goesToPath/${row.id}` */
  goesToPath?: string
  total: number
}

export * from './Pagination'
