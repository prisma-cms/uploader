import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from './MUI/theme'
import theme from '../../theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <MuiThemeProvider
        theme={muiTheme}
        // For SSR only
        sheetsManager={
          typeof global.window === 'undefined' ? new Map() : undefined
        }
      >
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  )
}

export default App
