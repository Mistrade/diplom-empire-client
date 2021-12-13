import React, { useEffect, useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { WorkTypeManagement } from './WorkTypeManagement'
import { Route, RouteComponentProps, Switch, useHistory, withRouter } from 'react-router-dom'
import { Task } from '@mui/icons-material'

interface TaskParametersProps {

}

export interface TabItemProps {
  title: string,
  key: 'type-to-delivery-task' | 'how-to-complete-task',
  path: 'work-types' | 'task-delivery'
}

const TaskParameters: React.FC<RouteComponentProps> = ( { match } ) => {
  const history = useHistory()
  const tabs: Array<TabItemProps> = [
    { title: 'Создание задания', key: 'type-to-delivery-task', path: 'work-types' },
    {
      title: 'Модерация задания',
      key: 'how-to-complete-task',
      path: 'task-delivery'
    }
  ]

  const [activeTab, setActiveTab] = useState<TabItemProps>( tabs[ 0 ] )

  useEffect( () => {
    history.push( match.path + '/' + activeTab.path )
  }, [activeTab] )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', display: 'flex' }}>
        <Typography variant={'h1'} fontSize={20}>
          Управление параметрами реализации заданий
        </Typography>
      </Box>
      <Box>
        <Tabs sx={{ mt: 2 }} value={tabs.findIndex( item => item.key === activeTab.key ) || 0}>
          {tabs.map( item => (
            <Tab label={item.title} sx={{ fontSize: 12 }} onClick={() => {
              setActiveTab( item )
            }}/>
          ) )}
        </Tabs>

        <Switch>
          <Route
            exact={true}
            path={match.path + '/work-types'}
            render={() => <WorkTypeManagement/>}
          />
        </Switch>
      </Box>
    </Box>
  )
}

export default withRouter( TaskParameters )