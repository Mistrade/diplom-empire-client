import {
  NavLink,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
  withRouter
} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Badge, Tab, Tabs } from '@mui/material'
import { routeList } from '../../../common/routeList'

const MyTasks: React.FC<RouteComponentProps> = ( { match } ) => {
  const getIndex = ( name: string ) => {
    return paths.findIndex( item => item.key === name )
  }

  const {myTasks} = routeList.taskManager

  const [paths, setPaths] = useState( myTasks.getRouteList() )

  const history = useHistory()

  const [state, setState] = useState<{ path: string, key: keyof typeof routeList.taskManager.myTasks.routes, index: number }>( {
    path: '/',
    key: 'dashboard',
    index: getIndex( 'dashboard' )
  } )

  console.log( paths )

  useEffect( () => {
    history.push( myTasks.routes[ state.key ]().path )
  }, [state] )

  return (
    <>
      <Tabs sx={{ mt: 2 }} value={state.index}>
        {
          paths.map( ( item ) => (
            <Tab
              key={item.key}
              sx={{ padding: 2 }}
              label={
                <Badge
                  badgeContent={2}
                  color={'primary'}
                  sx={{ p: 1 }}
                >
                  {item.title}
                </Badge>
              }
              onClick={() => setState( {
                path: item.path,
                index: getIndex( item.key ),
                key: item.key
              } )}
            />
          ) )
        }
      </Tabs>

      <Switch>
        <Route exact={true} path={`${match.path}/`} render={() => (
          <h2>А тут дашборд по всем заданиям</h2>
        )}/>
        <Route path={`${match.path}/completed`}
               render={() => {
                 return ( <h2>Тут будут только выполненные задания</h2> )
               }}/>
        <Route path={`${match.path}/moderated`}
               render={() => ( <h2>Тут будут только задания на модерации</h2> )}/>
        <Route path={`${match.path}/disabled`}
               render={() => ( <h2>Тут будут только заблокированные</h2> )}/>
        <Route path={`${match.path}/in-work`}
               render={() => ( <h2>Тут будут только задания в работе</h2> )}/>
        <Route path={`${match.path}/active`}
               render={() => ( <h2>Тут будут только активные задания</h2> )}/>
        <Route path={`${match.path}/bookmarks`}
               render={() => ( <h2>Тут будут только избранные задания</h2> )}/>
        <Route path={`${match.path}/non-published`}
               render={() => ( <h2>Тут будут только неопубликованные задания</h2> )}/>
      </Switch>
    </>
  )
}

export default withRouter( MyTasks )