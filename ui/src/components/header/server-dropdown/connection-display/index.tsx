import { FC } from 'react'
import { Alert } from '@material-ui/lab'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { LinearProgress } from '@material-ui/core'

import EditConnection from './actions/Edit'
import RemoveConnection from './actions/Remove'
import MakeActive from './actions/MakeActive'
import { useConnectionsQuery, Connection } from 'generated'
import { Container, DataGridOuterContainer, DataGridInnerContainer } from './elements'

const ConnectionDisplay: FC = () => {
  const { isLoading, data, isError } = useConnectionsQuery()
  const connections: Connection[] = (data?.connections?.filter(Boolean) as Connection[]) || []
  return (
    <Container elevation={2}>
      {isError ? <Alert>Something went wrong</Alert> : null}
      {isLoading ? <LinearProgress variant='indeterminate' /> : null}
      <div>
        <DataGridOuterContainer>
          <DataGridInnerContainer>
            <DataGrid columns={columns} rows={connections} />
          </DataGridInnerContainer>
        </DataGridOuterContainer>
      </div>
    </Container>
  )
}

const columns: GridColDef[] = [
  {
    field: 'isActive',
    headerName: 'Active',
    flex: 0.25,
    disableColumnMenu: true,
    sortable: false,
    renderCell: params => <MakeActive {...(params.row as Connection)} />
  },
  { field: 'name', headerName: 'Name', flex: 0.45 },
  {
    field: 'host',
    headerName: 'Host',
    flex: 0.6
  },
  {
    field: 'edit',
    headerName: 'Edit',
    headerAlign: 'center',
    flex: 0.4,
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ id }) => {
      return (
        <>
          <EditConnection id={id} />
          <RemoveConnection id={id} />
        </>
      )
    }
  }
]

export default ConnectionDisplay
