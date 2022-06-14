import { FC } from 'react'
import { RefetchOptions, QueryObserverResult } from 'react-query'
import { SpeedDialIcon, SpeedDialAction } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CloseIcon from '@mui/icons-material/Close'

import { SpeedDialContainer } from './elements'
import { useSpeedDial } from './useSpeedDial'

export const SpeedDials: FC<Props> = ({ refresh }) => {
  const { open, handleClose, handleGoToAdd, handleOpen } = useSpeedDial()

  return (
    <SpeedDialContainer
      ariaLabel='key actions'
      icon={<SpeedDialIcon openIcon={<CloseIcon />} icon={<MoreVertIcon />} />}
      onClose={handleClose()}
      onOpen={handleOpen}
      open={open}
      FabProps={{ size: 'small' }}
      direction='right'
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
