import React from 'react'
import { NavLink, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import MyTasks from './MyTasks/MyTasks'
import CreateNewTask from './CreateNewTask/CreateNewTask'
import ShopWindow from './ShopWindow/ShopWindow'
import ExpertsList from './ExpertsList/ExpertsList'
import MarketPlace from './MarketPlace/MarketPlace'

const TaskManager: React.FC<RouteComponentProps> = ( {
                                                       match,
                                                       location
                                                     } ) => {
  return (
    <>
      <Switch location={location}>
        <Route
          path={`${match.path}/my-tasks`}
          render={() => <MyTasks/>}
        />
        <Route
          exact
          path={`${match.path}/create`}
          render={() => ( <CreateNewTask/> )}
        />
        <Route
          exact
          path={`${match.path}/shopwindow`}
          render={() => ( <ShopWindow/> )}
        />
        <Route
          exact
          path={`${match.path}/expert-rating`}
          render={() => ( <ExpertsList/> )}
        />
        <Route
          exact
          path={`${match.path}/marketplace`}
          render={() => ( <MarketPlace/> )}
        />
      </Switch>
    </>
  )
}

export default withRouter( TaskManager )