import React from 'react'
import { useGetTaskInfoQuery } from './graphqlTypes/taskInfo'
import { Header } from './components/Header/Header'
import { Layout } from './components/Layout/Layout'
import { NavBar } from './components/NavBar/NavBar'
import { Route, Switch } from 'react-router-dom'
import TaskManager from './components/TaskManager/TaskManager'
import AdminCenter from './components/AdminCenter/AdminCenter'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterMoment'
import moment from 'moment'
import 'moment/locale/ru'
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage'
import { Typography } from '@mui/material'
import { SnackbarProvider } from 'notistack'


function App() {
  const { data, loading, error } = useGetTaskInfoQuery( {
    variables: {
      id: '619ba099d78f18189810edfd'
    }
    // pollInterval: 1000
  } )

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <LocalizationProvider dateAdapter={DateAdapter} locale={moment().locale()}>
        <div className="App">
          <Layout
            header={() => <Header/>}
            navbar={() => (
              <NavBar/>
            )}
            content={() => (
              <Switch>
                <Route exact={true} path={'/'}
                       render={() => <Typography>Главная страница</Typography>}/>
                <Route path={'/task-manager'} render={() => <TaskManager/>}/>
                <Route path={'/admin-center'} render={() => <AdminCenter/>}/>
                <Route path={'*'} render={() => <NotFoundPage variant={'main'}/>}/>
              </Switch>
            )}
          />
        </div>
      </LocalizationProvider>
    </SnackbarProvider>
  )
}

export default App