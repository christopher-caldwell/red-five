import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle, darkTheme } from 'constants/theme'
import Router from 'router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10 // 10m
    }
  }
})

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
