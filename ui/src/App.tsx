import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ThemeProvider } from 'constants/theme'
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
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
