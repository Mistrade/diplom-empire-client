import React from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import SubjectManagement from './SubjectManagement/SubjectManagement'
import TaskParameters from './TaskParameters'

const ProjectSettings: React.FC<RouteComponentProps> = ( { match } ) => {
  return (
    <>
      <Switch>
        <Route path={match.path + '/subject-management'} render={() => <SubjectManagement/>}/>
        <Route path={match.path + '/task-params'} render={() => <TaskParameters/>}/>
      </Switch>
    </>
  )
}

export default withRouter( ProjectSettings )