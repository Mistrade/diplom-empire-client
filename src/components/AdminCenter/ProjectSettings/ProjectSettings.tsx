import React from 'react'
import { Route, RouteComponentProps, Switch, useHistory, withRouter } from 'react-router-dom'
import SubjectManagement from './SubjectManagement/SubjectManagement'
import PushSubSubjectsToAcademicSubject from './SubjectManagement/PushSubSubjectsToAcademicSubject'

const ProjectSettings: React.FC<RouteComponentProps> = ( { match } ) => {
  return (
    <>
      <Switch>
        <Route exact path={match.path + '/subject-management'} render={() => <SubjectManagement/>}/>
        <Route exact={true} path={match.path + '/subject-management/:id?'}
               render={() => <PushSubSubjectsToAcademicSubject/>}/>
      </Switch>
    </>
  )
}

export default withRouter( ProjectSettings )