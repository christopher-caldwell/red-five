import { FC } from 'react'
import { Alert } from '@material-ui/lab'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { IconButton, LinearProgress } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Delete'

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
  { field: 'name', headerName: 'Name', flex: 0.5 },
  {
    field: 'host',
    headerName: 'Host',
    flex: 0.5
  },
  { field: 'port', headerName: 'Port', flex: 0.3 },
  {
    field: 'edit',
    headerName: 'Edit',
    headerAlign: 'center',
    flex: 0.25,
    disableColumnMenu: true,
    sortable: false,
    renderCell: params => {
      console.log('params', params)
      return (
        <>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <RemoveIcon />
          </IconButton>
        </>
      )
    }
  }
]

export default ConnectionDisplay
