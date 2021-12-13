import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './index.sass'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'

const client = new ApolloClient( {
  uri: 'http://localhost:9099/graphql',
  cache: new InMemoryCache()
} )
export const theme = createTheme( {
  palette: {
    primary: { main: '#06C0d7' },
    secondary: { main: '#DAD4EC' },
    success: { main: '#C2E59C' },
    background: {
      default: '#FFF',
      paper: '#FFF'
    }
  }
} )
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById( 'root' )
)