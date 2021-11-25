import React from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import ProjectSettings from './ProjectSettings/ProjectSettings'

const AdminCenter: React.FC<RouteComponentProps> = ( { match } ) => {
  return (
    <Switch>
      <Route path={match.path + '/project-settings'} render={() => <ProjectSettings/>}/>
    </Switch>
  )
}

export default withRouter( AdminCenter )