import { FC, PropsWithChildren } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// import { brandColor } from '@_ui/constants/styles'

// const GlobalStyle = createGlobalStyle`
//   body {
//     margin: 0;
//     padding: 0;
//     background-color: ${({ theme }) => theme.primaryBackgroundColor};
//   }
//   *::-webkit-scrollbar {
//     display: none;
//   }
//   * {
//     color: ${({ theme }) => theme.primaryTextColor};
//     font-family: body !important;
//   }
//   a {
//     color: ${({ theme }) => theme.palette.primary.main};
//     text-decoration: none;
//   }
//   h1,h2,h3,h4,h5,h6 {
//     margin: 0
//   }
// `

export interface Theme {
  mode: 'light' | 'dark'
  primaryTitleColor: string
  primaryBackgroundColor: string
  primaryTextColor: string
  secondaryBackgroundColor: string
  secondaryTitleColor: string
  secondaryTextColor: string
  primaryButtonColor: string
  secondaryButtonColor: string
  brandColor: string
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D82C20'
    },
    secondary: {
      main: '#636466'
    },
    success: {
      main: '#388e3c'
    }
  }
})

// A41E11 - med red
// D82C20 - bright red

export const ThemeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
)
