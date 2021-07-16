import { DefaultTheme, createGlobalStyle } from 'styled-components'

import { brandColor } from 'constants/styles'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.primaryBackgroundColor};
    font-family: Proxima Nova;
  }
  *::-webkit-scrollbar {
    display: none;
  }
  * {
    color: ${({ theme }) => theme.primaryTextColor};
    font-family: 'body';
  }
  a {
    color: ${({ theme }) => theme.brandColor};
    text-decoration: none;
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

export const darkTheme: DefaultTheme = {
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
