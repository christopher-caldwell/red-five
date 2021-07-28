import styled from 'styled-components'
import { Drawer as MuiDrawer } from '@material-ui/core'

const drawerWidth = 240

export const Root = styled.div`
  display: flex;
`
export const Content = styled.main`
  padding: 16px;
  margin-left: ${drawerWidth}px;
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  width: 100%;
  & > div {
    padding: 2% 0;
    width: 50vw;
  }
`

export const DrawerContainer = styled.div`
  overflow: auto;
`

export const Drawer = styled(MuiDrawer)`
  width: ${drawerWidth};
  flex-shrink: 0;
`
