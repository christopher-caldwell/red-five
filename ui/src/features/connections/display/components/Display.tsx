import { FC } from 'react'
import { styled, Paper, Alert, LinearProgress } from '@mui/material'
import { Column } from 'react-table'

import { DataTable, usePagination } from '@/components'
import { useConnectionsQuery, Connection } from '@/generated'
import { EditConnection } from '@/features/connections/edit'
import { MakeActive, RemoveConnection } from './'

export const ConnectionDisplay: FC = () => {
  const { isFetching, isError, data } = useConnectionsQuery()
  const { page, rowsPerPage, ...rest } = usePagination()
  const connections: Connection[] = data?.connections || []
  return (
    <Container elevation={2}>
      {isError ? (
        <Alert variant='filled' severity='error'>
          Something went wrong
        </Alert>
      ) : null}
      {isFetching ? <LinearProgress variant='indeterminate' /> : null}
      <div>
        <DataGridOuterContainer>
          <DataGridInnerContainer>
            <DataTable<Connection>
              total={connections.length}
              items={connections}
              isLoading={isFetching}
              columns={columns}
              page={page}
              rowsPerPage={rowsPerPage}
              {...rest}
            />
          </DataGridInnerContainer>
        </DataGridOuterContainer>
      </div>
    </Container>
  )
}

const columns: Column<Connection>[] = [
  {
    Header: 'Active',
    accessor: 'isActive',
    Cell: ({ row }) => {
      return <MakeActive {...(row.values as Connection)} />
    }
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Host',
    accessor: 'host'
  },
  {
    Header: 'Edit',
    accessor: 'id',
    Cell: ({ row }) => {
      return (
        <>
          <EditConnection id={row.values.id} />
          <RemoveConnection id={row.values.id} />
        </>
      )
    }
  }
]

// const columns: GridColDef[] = [
//   {
//     renderCell: params => <MakeActive {...(params.row as Connection)} />
//   },
//   {
//     field: 'host',
//     headerName: 'Host',
//     flex: 0.6
//   },
//   {
//     field: 'edit',
//     headerName: 'Edit',
//     headerAlign: 'center',
//     flex: 0.3,
//     disableColumnMenu: true,
//     sortable: false,
//     renderCell: ({ id }) => {
//       return (
//         <>
//           <EditConnection id={id} />
//           <RemoveConnection id={id} />
//         </>
//       )

//     }
//   }
// ]

const Container = styled(Paper)`
  padding: 20px !important;
  min-width: 30vw;
`

const DataGridOuterContainer = styled('div')`
  height: 300px;
  width: 40vw;
`

const DataGridInnerContainer = styled('div')`
  display: flex;
  height: 100%;
`
