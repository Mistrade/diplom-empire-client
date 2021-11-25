import { NavLink, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import React from 'react'

const MyTasks: React.FC<RouteComponentProps> = ( { match } ) => {
  const paths = [
    {path: '/', title: 'Дашборд'},
    {path: "/completed", title: 'Выполненные'},
    {path: "/moderated", title: "На модерации"},
    {path: "/disabled", title: "Заблокированные"},
    {path: "/in-work", title: "В работе"},
    {path: "/active", title: "Активные"},
    {path: '/bookmarks', title: "Избранные"},
    {path: "/non-published", title: "Не опубликованные"}
  ]

  return (
    <>
      {
        paths.map((item) => (
          <NavLink to={`${match.path}${item.path}`}>
            {item.title}
          </NavLink>
        ))
      }

      <Switch>
        <Route exact={true} path={`${match.path}/`} render={() => (
          <h2>А тут дашборд по всем заданиям</h2>
        )}/>
        <Route path={`${match.path}/completed`}
               render={() => ( <h2>Тут будут только выполненные задания</h2> )}/>
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