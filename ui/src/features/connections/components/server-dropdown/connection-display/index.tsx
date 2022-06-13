import { FC } from 'react'
// import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { Alert, LinearProgress } from '@mui/material'

// import EditConnection from './actions/Edit'
// import RemoveConnection from './actions/Remove'
// import MakeActive from './actions/MakeActive'
import { useConnectionsQuery } from '@/generated'
import { Container, DataGridOuterContainer, DataGridInnerContainer } from './elements'

const ConnectionDisplay: FC = () => {
  const { isLoading, isError } = useConnectionsQuery()
  // const connections: Connection[] = data?.connections || []
  return (
    <Container elevation={2}>
      {isError ? (
        <Alert variant='filled' severity='error'>
          Something went wrong
        </Alert>
      ) : null}
      {isLoading ? <LinearProgress variant='indeterminate' /> : null}
      <div>
        <DataGridOuterContainer>
          <DataGridInnerContainer>
            {/* <DataGrid disableColumnSelector disableSelectionOnClick columns={columns} rows={connections} /> */}
          </DataGridInnerContainer>
        </DataGridOuterContainer>
      </div>
    </Container>
  )
}

// const columns: GridColDef[] = [
//   {
//     field: 'isActive',
//     headerName: 'Active',
//     flex: 0.25,
//     disableColumnMenu: true,
//     sortable: false,
//     renderCell: params => <MakeActive {...(params.row as Connection)} />
//   },
//   { field: 'name', headerName: 'Name', flex: 0.35, disableColumnMenu: true },
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

export default ConnectionDisplay