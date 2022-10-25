import { FC, useState } from 'react'
import { styled, Paper, Alert, LinearProgress } from '@mui/material'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import { Table } from '@caldwell619/ui-components'

import { useConnectionsQuery, Connection } from '@_ui-types'
import { EditConnection } from '@_ui/features/connections/edit'
import { MakeActive, RemoveConnection } from './'

export const ConnectionDisplay: FC = () => {
  const sortingHandler = useState<SortingState>([])
  const { isFetching, isError, data } = useConnectionsQuery()
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
        <Table<Connection>
          colors={{
            headerBackground: '#212121',
            border: '#212121'
          }}
          sortingHandler={sortingHandler}
          total={connections.length}
          items={connections}
          isLoading={isFetching}
          columns={columns}
        />
      </div>
    </Container>
  )
}

const columns: ColumnDef<Connection>[] = [
  {
    header: 'Active',
    accessorKey: 'isActive',
    size: 0,
    cell: ({ row }) => {
      return <MakeActive {...(row.original as Connection)} />
    }
  },
  {
    header: 'Name',
    accessorKey: 'name'
  },
  {
    header: 'Host',
    accessorKey: 'host'
  },
  {
    header: 'Edit',
    enableSorting: false,
    cell: ({ row: { original } }) => {
      return (
        <>
          <EditConnection id={original.id} />
          <RemoveConnection id={original.id} />
        </>
      )
    }
  }
]

const Container = styled(Paper)`
  min-width: 30vw;
`
