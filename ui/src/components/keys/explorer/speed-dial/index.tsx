import { FC } from 'react'
import { RefetchOptions, QueryObserverResult } from 'react-query'
import { SpeedDialIcon, SpeedDialAction } from '@material-ui/lab'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CloseIcon from '@material-ui/icons/Close'

import { SpeedDialContainer } from './elements'
import { useSpeedDial } from './useSpeedDial'

const SpeedDials: FC<Props> = ({ refresh }) => {
  const { open, handleClose, handleGoToAdd, handleOpen } = useSpeedDial()

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
