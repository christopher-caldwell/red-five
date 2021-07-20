import { FC, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { RefetchOptions, QueryObserverResult } from 'react-query'
import { SpeedDialIcon, SpeedDialAction } from '@material-ui/lab'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CloseIcon from '@material-ui/icons/Close'

import { useInvalidateAllKeys } from 'utils/cache'
import { Routes } from 'router/routes'
import { SpeedDialContainer } from './elements'

const SpeedDials: FC<Props> = ({ refresh }) => {
  const [open, setOpen] = useState(false)
  const { push } = useHistory()
  const invalidateAllKeys = useInvalidateAllKeys()

  const handleClose = useCallback(
    (invalidateKeys?: boolean) => async () => {
      if (invalidateKeys) {
        invalidateAllKeys()
      }
      setOpen(false)
    },
    [invalidateAllKeys]
  )

  const handleGoToAdd = useCallback(() => {
    push(Routes.CreateKey)
  }, [push])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  return (
    <SpeedDialContainer
      ariaLabel='key actions'
      icon={<SpeedDialIcon openIcon={<CloseIcon />} icon={<MoreVertIcon />} />}
      onClose={handleClose()}
      onOpen={handleOpen}
      open={open}
      FabProps={{ size: 'small' }}
      direction='down'
    >
      <SpeedDialAction key='refresh' icon={<RefreshIcon />} tooltipTitle='Refresh' onClick={handleClose(true)} />
      <SpeedDialAction key='add' icon={<AddIcon />} tooltipTitle='Add' onClick={handleGoToAdd} />
    </SpeedDialContainer>
  )
}

type Refresh = (options?: RefetchOptions) => Promise<QueryObserverResult>
interface Props {
  refresh: Refresh
}

export default SpeedDials
