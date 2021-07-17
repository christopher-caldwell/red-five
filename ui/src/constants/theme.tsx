import { FC } from 'react'
import { DefaultTheme, createGlobalStyle, ThemeProvider as ScThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { brandColor } from 'constants/styles'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.primaryBackgroundColor};
  }
  *::-webkit-scrollbar {
    display: none;
  }
  * {
    color: ${({ theme }) => theme.primaryTextColor};
    font-family: body !important;
  }
  a {
    color: ${({ theme }) => theme.brandColor};
    text-decoration: none;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0
  }
`

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

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const darkTheme: DefaultTheme = {
  mode: 'dark',
  primaryBackgroundColor: '#212124',
  primaryTextColor: '#FFFFFF',
  primaryTitleColor: 'white',
  secondaryBackgroundColor: brandColor,
  secondaryTitleColor: '#1e9c17',
  secondaryTextColor: brandColor,
  primaryButtonColor: brandColor,
  secondaryButtonColor: 'black',
  brandColor
}

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#D82C20'
    },
    secondary: {
      main: '#636466'
    }
  }
})

// A41E11 - med red
// D82C20 - bright red

export const ThemeProvider: FC = ({ children }) => (
  <ScThemeProvider theme={darkTheme}>
    <GlobalStyle />
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  </ScThemeProvider>
)
